<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Umkm;
use App\Models\User;
use App\Policies\CategoryPolicy;
use App\Policies\ProductPolicy;
use App\Policies\UmkmPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Admin CSR (Super Admin) selalu lolos setiap pengecekan otorisasi —
        // ditulis SEKALI di sini, bukan diulang di tiap method Policy.
        Gate::before(function (User $user, string $ability) {
            return $user->isAdminCsr() ? true : null;
        });

        Gate::policy(Umkm::class, UmkmPolicy::class);
        Gate::policy(Product::class, ProductPolicy::class);
        Gate::policy(Category::class, CategoryPolicy::class);
    }
}
