<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('umkms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('owner_name');
            $table->string('district');
            $table->string('phone')->nullable();
            $table->unsignedSmallInteger('established_year')->nullable();
            $table->unsignedSmallInteger('csr_batch_year')->nullable();
            $table->string('shopee_shop_url')->nullable();
            $table->string('certification')->nullable();
            $table->unsignedSmallInteger('members_count')->default(0);
            $table->text('description')->nullable();
            $table->string('banner_url')->nullable();
            $table->string('logo_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('umkms');
    }
};
