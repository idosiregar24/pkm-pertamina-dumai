<?php

namespace Tests\Feature\Admin;

use App\Models\Product;
use App\Models\Umkm;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Regresi untuk bug nyata: UpdateProductRequest/UpdateUmkmRequest sebelumnya
 * mewajibkan path setelah domain ("...shopee.co.id/xxx"), padahal
 * .claude/rules/logic-standards.md §5 hanya mensyaratkan protokol + host.
 * Data seeder memakai URL toko polos ("https://shopee.co.id" tanpa path),
 * sehingga SETIAP edit produk/UMKM gagal tervalidasi walau field itu
 * tidak disentuh sama sekali.
 */
class ShopeeUrlValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_product_with_bare_shopee_domain_can_still_be_updated(): void
    {
        $csr = User::factory()->create();
        $umkm = Umkm::create(['name' => 'K', 'owner_name' => 'O', 'district' => 'D', 'members_count' => 1]);
        $product = Product::create([
            'umkm_id' => $umkm->id, 'name' => 'Produk Lama', 'price' => 10000, 'unit' => 'pcs',
            'category' => 'Umum', 'shopee_url' => 'https://shopee.co.id',
        ]);

        $response = $this->actingAs($csr)->post(route('admin.produk.update', $product->id), [
            '_method' => 'PATCH',
            'umkm_id' => $umkm->id,
            'name' => 'Produk Baru',
            'price' => 12000,
            'unit' => 'pcs',
            'category' => 'Umum',
            'shopee_url' => 'https://shopee.co.id', // field yang tidak disentuh user
        ]);

        $response->assertSessionDoesntHaveErrors();
        $response->assertRedirect(route('admin.produk.index'));
        $this->assertDatabaseHas('products', ['id' => $product->id, 'name' => 'Produk Baru']);
    }

    public function test_umkm_with_bare_shopee_domain_can_still_be_updated(): void
    {
        $csr = User::factory()->create();
        $umkm = Umkm::create([
            'name' => 'Kelompok Lama', 'owner_name' => 'O', 'district' => 'D', 'members_count' => 1,
            'shopee_shop_url' => 'https://shopee.co.id',
        ]);

        $response = $this->actingAs($csr)->post(route('admin.umkm.update', $umkm->id), [
            '_method' => 'PATCH',
            'name' => 'Kelompok Baru',
            'owner_name' => 'O',
            'district' => 'D',
            'members_count' => 1,
            'shopee_shop_url' => 'https://shopee.co.id',
        ]);

        $response->assertSessionDoesntHaveErrors();
        $response->assertRedirect(route('admin.umkm.index'));
        $this->assertDatabaseHas('umkms', ['id' => $umkm->id, 'name' => 'Kelompok Baru']);
    }

    public function test_non_shopee_url_is_still_rejected(): void
    {
        $csr = User::factory()->create();
        $umkm = Umkm::create(['name' => 'K', 'owner_name' => 'O', 'district' => 'D', 'members_count' => 1]);
        $product = Product::create([
            'umkm_id' => $umkm->id, 'name' => 'Produk', 'price' => 10000, 'unit' => 'pcs', 'category' => 'Umum',
        ]);

        $response = $this->actingAs($csr)->post(route('admin.produk.update', $product->id), [
            '_method' => 'PATCH',
            'umkm_id' => $umkm->id,
            'name' => 'Produk',
            'price' => 10000,
            'unit' => 'pcs',
            'category' => 'Umum',
            'shopee_url' => 'https://tokopedia.com/toko-jahat',
        ]);

        $response->assertSessionHasErrors('shopee_url');
    }
}
