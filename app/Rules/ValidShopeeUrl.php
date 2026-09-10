<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Satu-satunya sumber kebenaran validasi URL Shopee di sisi backend — mencerminkan
 * persis `isValidShopeeUrl()` di .claude/rules/logic-standards.md §5: hanya
 * mensyaratkan protokol https dan host shopee.co.id/www.shopee.co.id, TANPA
 * mewajibkan path tambahan setelah domain (link toko polos seperti
 * "https://shopee.co.id" tetap sah).
 */
class ValidShopeeUrl implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (blank($value)) {
            return;
        }

        $parts = parse_url($value);

        $isValid = ($parts['scheme'] ?? null) === 'https'
            && in_array($parts['host'] ?? null, ['shopee.co.id', 'www.shopee.co.id'], true);

        if (! $isValid) {
            $fail('Tautan harus berupa URL resmi Shopee (https://shopee.co.id/... atau https://www.shopee.co.id/...).');
        }
    }
}
