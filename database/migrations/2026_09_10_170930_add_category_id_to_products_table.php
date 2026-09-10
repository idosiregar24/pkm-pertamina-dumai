<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->after('umkm_id')
                ->constrained('categories')->restrictOnDelete();
        });

        // Backfill: setiap nilai distinct di kolom `category` (string, peninggalan
        // sebelum tabel categories ada) dibuatkan baris categories yang sepadan,
        // lalu products.category_id diisi otomatis. Membuat migration ini aman
        // dijalankan baik di DB baru (kosong) maupun DB dev yang sudah terisi data.
        $distinctCategories = DB::table('products')
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->distinct()
            ->pluck('category');

        foreach ($distinctCategories as $categoryName) {
            $categoryId = DB::table('categories')->where('name', $categoryName)->value('id');

            if (! $categoryId) {
                $categoryId = DB::table('categories')->insertGetId([
                    'name' => $categoryName,
                    'slug' => Str::slug($categoryName),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            DB::table('products')->where('category', $categoryName)->update(['category_id' => $categoryId]);
        }
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropConstrainedForeignId('category_id');
        });
    }
};
