<?php

namespace Tests\Feature\Admin;

use App\Models\Category;
use App\Models\Product;
use App\Models\Umkm;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Bukti otomatis bahwa isolasi data multi-tenant (Admin CSR vs Admin Kelompok)
 * benar-benar ditegakkan di level HTTP — bukan cuma di level Policy/tinker.
 */
class RbacIsolationTest extends TestCase
{
    use RefreshDatabase;

    private Umkm $umkmA;
    private Umkm $umkmB;
    private Category $category;
    private User $csr;
    private User $adminA;
    private User $adminB;
    private Product $productA;
    private Product $productB;

    protected function setUp(): void
    {
        parent::setUp();

        $this->umkmA = Umkm::create([
            'name' => 'Kelompok A', 'owner_name' => 'Owner A', 'district' => 'Dumai Kota', 'members_count' => 5,
        ]);
        $this->umkmB = Umkm::create([
            'name' => 'Kelompok B', 'owner_name' => 'Owner B', 'district' => 'Dumai Barat', 'members_count' => 5,
        ]);
        $this->category = Category::create(['name' => 'Umum', 'slug' => 'umum']);

        $this->csr = User::factory()->create();
        $this->adminA = User::factory()->adminKelompok($this->umkmA)->create();
        $this->adminB = User::factory()->adminKelompok($this->umkmB)->create();

        $this->productA = Product::create([
            'umkm_id' => $this->umkmA->id, 'category_id' => $this->category->id,
            'name' => 'Produk A', 'price' => 10000, 'unit' => 'pcs', 'category' => 'Umum',
        ]);
        $this->productB = Product::create([
            'umkm_id' => $this->umkmB->id, 'category_id' => $this->category->id,
            'name' => 'Produk B', 'price' => 20000, 'unit' => 'pcs', 'category' => 'Umum',
        ]);
    }

    public function test_guest_is_redirected_from_admin_panel(): void
    {
        $this->get('/admin')->assertRedirect('/login');
    }

    public function test_admin_kelompok_cannot_open_umkm_listing(): void
    {
        $this->actingAs($this->adminA)
            ->get(route('admin.umkm.index'))
            ->assertForbidden();
    }

    public function test_admin_kelompok_cannot_open_kelompok_admin_management(): void
    {
        $this->actingAs($this->adminA)
            ->get(route('admin.kelompok-admin.index'))
            ->assertForbidden();
    }

    public function test_admin_kelompok_can_edit_own_umkm_profile(): void
    {
        $this->actingAs($this->adminA)
            ->get(route('admin.umkm.edit', $this->umkmA))
            ->assertOk();
    }

    /**
     * Regresi: redirect setelah update dulu selalu ke admin.umkm.index, padahal
     * Admin Kelompok tidak boleh melihat listing itu (UmkmPolicy::viewAny selalu
     * false untuk mereka) — hasilnya 403 tepat setelah berhasil menyimpan.
     */
    public function test_admin_kelompok_update_own_umkm_redirects_somewhere_they_can_view(): void
    {
        $response = $this->actingAs($this->adminA)->post(route('admin.umkm.update', $this->umkmA), [
            '_method' => 'PATCH',
            'name' => 'Kelompok A Updated',
            'owner_name' => 'Owner A',
            'district' => 'Dumai Kota',
            'members_count' => 5,
        ]);

        $response->assertSessionDoesntHaveErrors();
        $redirectUrl = $response->headers->get('Location');

        // Ikuti redirect-nya dan pastikan TIDAK 403 — ini yang gagal sebelum diperbaiki.
        $this->followingRedirects()->actingAs($this->adminA);
        $this->get($redirectUrl)->assertOk();

        $this->assertDatabaseHas('umkms', ['id' => $this->umkmA->id, 'name' => 'Kelompok A Updated']);
    }

    public function test_admin_kelompok_cannot_edit_other_umkm_profile(): void
    {
        $this->actingAs($this->adminA)
            ->get(route('admin.umkm.edit', $this->umkmB))
            ->assertForbidden();
    }

    public function test_admin_kelompok_product_listing_only_contains_own_products(): void
    {
        $response = $this->actingAs($this->adminA)->get(route('admin.produk.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->has('products', 1)
            ->where('products.0.id', $this->productA->id)
        );
    }

    public function test_admin_kelompok_cannot_edit_other_tenant_product(): void
    {
        $this->actingAs($this->adminA)
            ->get(route('admin.produk.edit', $this->productB))
            ->assertForbidden();
    }

    public function test_admin_kelompok_cannot_delete_other_tenant_product(): void
    {
        $this->actingAs($this->adminA)
            ->delete(route('admin.produk.destroy', $this->productB))
            ->assertForbidden();

        $this->assertDatabaseHas('products', ['id' => $this->productB->id]);
    }

    /**
     * Skenario serangan inti: Admin Kelompok A mengirim umkm_id milik Kelompok B
     * lewat payload manual (DevTools/Postman). Server WAJIB mengabaikannya.
     */
    public function test_admin_kelompok_cannot_spoof_umkm_id_when_creating_product(): void
    {
        $this->actingAs($this->adminA)->post(route('admin.produk.store'), [
            'umkm_id' => $this->umkmB->id, // payload dipalsukan
            'name' => 'Produk Titipan',
            'price' => 15000,
            'unit' => 'pcs',
            'category_id' => $this->category->id,
        ])->assertRedirect(route('admin.produk.index'));

        $this->assertDatabaseHas('products', [
            'name' => 'Produk Titipan',
            'umkm_id' => $this->umkmA->id, // tetap tercatat milik kelompok sendiri
        ]);
    }

    public function test_admin_csr_can_manage_any_umkm_and_product(): void
    {
        $this->actingAs($this->csr)->get(route('admin.umkm.index'))->assertOk();
        $this->actingAs($this->csr)->get(route('admin.umkm.edit', $this->umkmB))->assertOk();
        $this->actingAs($this->csr)->get(route('admin.produk.edit', $this->productB))->assertOk();
    }

    public function test_admin_csr_can_register_new_kelompok_admin_account(): void
    {
        $response = $this->actingAs($this->csr)->post(route('admin.kelompok-admin.store'), [
            'name' => 'Pengurus Baru',
            'email' => 'pengurus-baru@example.com',
            'password' => 'password123',
            'umkm_id' => $this->umkmA->id,
        ]);

        $response->assertRedirect(route('admin.kelompok-admin.index'));

        $this->assertDatabaseHas('users', [
            'email' => 'pengurus-baru@example.com',
            'role' => 'admin_kelompok',
            'umkm_id' => $this->umkmA->id,
        ]);
    }

    public function test_admin_kelompok_cannot_register_new_kelompok_admin_account(): void
    {
        $this->actingAs($this->adminA)->post(route('admin.kelompok-admin.store'), [
            'name' => 'Pengurus Ilegal',
            'email' => 'ilegal@example.com',
            'password' => 'password123',
            'umkm_id' => $this->umkmB->id,
        ])->assertForbidden();

        $this->assertDatabaseMissing('users', ['email' => 'ilegal@example.com']);
    }
}
