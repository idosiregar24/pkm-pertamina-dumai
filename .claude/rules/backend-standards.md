# Backend Standards (Laravel 11)

Standar arsitektur backend Laravel untuk platform direktori & katalog UMKM Binaan CSR Pertamina Patra Niaga Dumai.

---

## 1. Struktur Controller & Resourceful Pattern

- **Controller Publik:**
  - `HomeController`: Menampilkan halaman beranda, statistik binaan, produk unggulan, dan highlight program PKM.
  - `DirectoryController`: Menampilkan list seluruh UMKM binaan CSR (`index`) dan detail profil UMKM beserta daftar produknya (`show`).
  - `ProductController`: Menampilkan katalog seluruh produk (`index`) dan detail produk spesifik (`show`).
- **Controller Admin (`App\Http\Controllers\Admin`):**
  - `UmkmController`: CRUD data UMKM binaan.
  - `ProductController`: CRUD inventaris produk per UMKM.
  - `CategoryController`: Manajemen master kategori produk.
- **Prinsip Controller Tipis (Thin Controller):**
  - Controller hanya bertugas menangani request HTTP, memanggil query/model/service, dan mengembalikan response Inertia.
  - Validasi tidak boleh ditulis langsung di dalam controller; gunakan `FormRequest`.

---

## 2. Model & Relasi Eloquent

1. **`Umkm` (atau `UmkmProfile`):**
   - Relasi: `hasMany(Product::class)`, `belongsTo(Category::class)` (opsional atau via pivot).
   - Scope: `scopeActive($query)`, `scopeSearch($query, $term)`.
   - Accessor: `whatsapp_url`, `formatted_phone`.
2. **`Product`:**
   - Relasi: `belongsTo(Umkm::class)`, `belongsTo(Category::class)`.
   - Scope: `scopeAvailable($query)`, `scopeByCategory($query, $categoryId)`, `scopeSearch($query, $term)`.
   - Cast: `price` => `integer`, `is_available` => `boolean`.
3. **`Category`:**
   - Relasi: `hasMany(Product::class)`.
   - Atribut: `name`, `slug`, `icon_name`, `description`.

---

## 3. Inertia Response & API Resource Shape

- Gunakan `JsonResource` (`UmkmResource`, `ProductResource`) untuk membentuk payload yang bersih dan aman sebelum dikirim ke frontend via `Inertia::render()`:
  ```php
  return Inertia::render('Products/Index', [
      'products' => ProductResource::collection($products),
      'categories' => CategoryResource::collection($categories),
      'filters' => $request->only(['search', 'category', 'sort']),
  ]);
  ```
- URL gambar harus dikonversi ke path publik yang dapat diakses:
  ```php
  'image_url' => $this->image ? asset('storage/' . $this->image) : asset('asset/placeholder-product.webp'),
  ```

---

## 4. Penanganan Upload File & Media

- Gambar produk dan logo/banner UMKM disimpan di disk `public` (`storage/app/public/products` dan `storage/app/public/umkm`).
- Nama file wajib di-generate secara acak (`Str::uuid()` atau hash bawaan Laravel) untuk mencegah file collision dan path traversal.
- Hapus file gambar lama dari storage saat admin memperbarui (update) atau menghapus (delete) data produk/UMKM.

---

## 5. FormRequest Validation

Seluruh payload input admin wajib divalidasi ketat:
```php
class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'umkm_id' => ['required', 'exists:umkms,id'],
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'unit' => ['nullable', 'string', 'max:50'], // pcs, bungkus, kg, botol
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'shopee_url' => ['nullable', 'url', 'regex:/^https:\/\/(www\.)?shopee\.co\.id\/.+/i'],
            'is_available' => ['boolean'],
        ];
    }
}
```

---

## 6. Query Optimization & Anti-Pattern N+1

- Setiap pengambilan data relasi di listing wajib menggunakan eager loading:
  ```php
  Product::with(['umkm:id,name,phone,slug', 'category:id,name,slug'])
         ->where('is_available', true)
         ->paginate(12);
  ```
- Dilarang memanggil `$product->umkm` di dalam looping tanpa eager loading sebelumnya.
