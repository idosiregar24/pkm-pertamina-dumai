<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Umkm;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PublicPortalTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Data minimal supaya halaman publik (katalog/direktori) punya sesuatu untuk ditampilkan —
        // tidak lagi bergantung pada data seeder sungguhan di database dev.
        $umkm = Umkm::create([
            'name' => 'Kelompok Contoh', 'owner_name' => 'Pemilik Contoh',
            'district' => 'Dumai Kota', 'members_count' => 5,
        ]);

        Product::create([
            'umkm_id' => $umkm->id, 'name' => 'Produk Contoh', 'price' => 15000,
            'unit' => 'pcs', 'category' => 'Umum', 'is_featured' => true,
        ]);
    }

    public function test_welcome_page_renders_with_database_products(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(
            fn(Assert $page) => $page
                ->component('Welcome')
                ->has('featuredProducts')
                ->has('totalProducts')
                ->has('stats')
        );
    }

    public function test_catalog_page_renders_with_database_products(): void
    {
        $response = $this->get('/katalog');

        $response->assertStatus(200);
        $response->assertInertia(
            fn(Assert $page) => $page
                ->component('Catalog')
                ->has('products')
                ->has('categories')
        );
    }

    public function test_directory_page_renders_with_database_umkms(): void
    {
        $response = $this->get('/direktori');

        $response->assertStatus(200);
        $response->assertInertia(
            fn(Assert $page) => $page
                ->component('Directory')
                ->has('umkms')
                ->has('products')
        );
    }

    public function test_directory_detail_page_renders_for_existing_umkm(): void
    {
        $umkm = Umkm::first();

        $this->assertNotNull($umkm);

        $response = $this->get('/direktori/' . $umkm->id);

        $response->assertStatus(200);
        $response->assertInertia(
            fn(Assert $page) => $page
                ->component('DirectoryShow')
                ->has('umkm')
        );
    }

    public function test_csr_program_page_renders(): void
    {
        $response = $this->get('/program-csr');

        $response->assertStatus(200);
        $response->assertInertia(
            fn(Assert $page) => $page
                ->component('CsrProgram')
        );
    }
}
