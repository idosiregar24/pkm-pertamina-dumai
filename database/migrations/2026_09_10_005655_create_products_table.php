<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('umkm_id')->constrained('umkms')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->decimal('price', 12, 2)->default(0);
            $table->string('unit')->default('pcs');
            $table->string('category')->default('Umum');
            $table->string('category_slug')->nullable();
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->string('shopee_url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->decimal('rating', 3, 1)->default(5.0);
            $table->unsignedInteger('sold_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
