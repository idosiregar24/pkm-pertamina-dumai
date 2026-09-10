<?php

namespace Tests\Feature\Admin;

use App\Models\Category;
use App\Models\Product;
use App\Models\Umkm;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Kurasi kategori produk khusus Admin CSR — lihat riwayat bug: kategori
 * sebelumnya string bebas per-produk (bisa "hilang" diam-diam lewat <select>
 * tertutup). Sekarang categories adalah tabel sungguhan; produk merujuknya
 * lewat category_id (FK), dan hanya Admin CSR yang boleh menambah/mengubah/
 * menghapusnya.
 */
class CategoryManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_csr_can_create_category(): void
    {
        $csr = User::factory()->create();

        $response = $this->actingAs($csr)->post(route('admin.kategori.store'), [
            'name' => 'Kerajinan Rotan',
            'icon_name' => 'Sparkles',
            'description' => 'Produk kerajinan berbahan rotan.',
        ]);

        $response->assertRedirect(route('admin.kategori.index'));
        $this->assertDatabaseHas('categories', ['name' => 'Kerajinan Rotan', 'slug' => 'kerajinan-rotan']);
    }

    public function test_admin_kelompok_cannot_manage_categories(): void
    {
        $umkm = Umkm::create(['name' => 'K', 'owner_name' => 'O', 'district' => 'D', 'members_count' => 1]);
        $kelompok = User::factory()->adminKelompok($umkm)->create();

        $this->actingAs($kelompok)->get(route('admin.kategori.index'))->assertForbidden();

        $this->actingAs($kelompok)->post(route('admin.kategori.store'), [
            'name' => 'Kategori Ilegal',
        ])->assertForbidden();

        $this->assertDatabaseMissing('categories', ['name' => 'Kategori Ilegal']);
    }

    public function test_admin_kelompok_can_still_see_categories_when_creating_a_product(): void
    {
        $umkm = Umkm::create(['name' => 'K', 'owner_name' => 'O', 'district' => 'D', 'members_count' => 1]);
        $kelompok = User::factory()->adminKelompok($umkm)->create();
        Category::create(['name' => 'Olahan Nanas & Kuliner', 'slug' => 'olahan-nanas-kuliner']);

        $response = $this->actingAs($kelompok)->get(route('admin.produk.create'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->has('categories', 1));
    }

    public function test_renaming_category_syncs_existing_products(): void
    {
        $csr = User::factory()->create();
        $umkm = Umkm::create(['name' => 'K', 'owner_name' => 'O', 'district' => 'D', 'members_count' => 1]);
        $category = Category::create(['name' => 'Nama Lama', 'slug' => 'nama-lama']);
        $product = Product::create([
            'umkm_id' => $umkm->id, 'category_id' => $category->id, 'name' => 'Produk', 'price' => 1000, 'unit' => 'pcs',
        ]);

        $this->actingAs($csr)->post(route('admin.kategori.update', $category->id), [
            '_method' => 'PATCH',
            'name' => 'Nama Baru',
        ])->assertRedirect(route('admin.kategori.index'));

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'category' => 'Nama Baru',
            'category_slug' => 'nama-baru',
        ]);
    }

    public function test_category_still_in_use_cannot_be_deleted(): void
    {
        $csr = User::factory()->create();
        $umkm = Umkm::create(['name' => 'K', 'owner_name' => 'O', 'district' => 'D', 'members_count' => 1]);
        $category = Category::create(['name' => 'Dipakai', 'slug' => 'dipakai']);
        Product::create([
            'umkm_id' => $umkm->id, 'category_id' => $category->id, 'name' => 'Produk', 'price' => 1000, 'unit' => 'pcs',
        ]);

        $this->actingAs($csr)->delete(route('admin.kategori.destroy', $category->id))
            ->assertRedirect(route('admin.kategori.index'));

        $this->assertDatabaseHas('categories', ['id' => $category->id]);
    }

    public function test_unused_category_can_be_deleted(): void
    {
        $csr = User::factory()->create();
        $category = Category::create(['name' => 'Tidak Dipakai', 'slug' => 'tidak-dipakai']);

        $this->actingAs($csr)->delete(route('admin.kategori.destroy', $category->id))
            ->assertRedirect(route('admin.kategori.index'));

        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }
}
