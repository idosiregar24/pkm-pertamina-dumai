import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'pertamina_dumai_cart';

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem(STORAGE_KEY);
                return saved ? JSON.parse(saved) : [];
            }
        } catch (e) {
            console.error('Error reading cart from localStorage', e);
        }
        return [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    // Sinkronisasi ke localStorage setiap kali ada perubahan pada cartItems
    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
            }
        } catch (e) {
            console.error('Error saving cart to localStorage', e);
        }
    }, [cartItems]);

    /**
     * Tambah produk ke keranjang belanja
     */
    const addToCart = (product, quantity = 1) => {
        setCartItems((prev) => {
            const existingIndex = prev.findIndex((item) => item.id === product.id);
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity,
                };
                return updated;
            } else {
                return [
                    ...prev,
                    {
                        id: product.id,
                        name: product.name,
                        price: Number(product.price) || 0,
                        unit: product.unit || 'pcs',
                        image_url: product.image_url,
                        quantity: quantity,
                        umkm: {
                            id: product.umkm?.id || 1,
                            name: product.umkm?.name || 'UMKM Binaan Pertamina',
                            phone: product.umkm?.phone || '',
                            district: product.umkm?.district || 'Kota Dumai',
                            shopee_url: product.umkm?.shopee_shop_url || product.shopee_url || '',
                        },
                    },
                ];
            }
        });
        // Buka drawer secara halus saat item ditambahkan
        setIsCartOpen(true);
    };

    /**
     * Hapus item dari keranjang
     */
    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    /**
     * Perbarui jumlah item
     */
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    /**
     * Kosongkan seluruh keranjang
     */
    const clearCart = () => {
        setCartItems([]);
    };

    /**
     * Total item terhitung
     */
    const totalCount = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
    }, [cartItems]);

    /**
     * Total harga rupiah terhitung
     */
    const totalPrice = useMemo(() => {
        return cartItems.reduce(
            (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
            0
        );
    }, [cartItems]);

    /**
     * Pengelompokan produk per-UMKM binaan (untuk multi-channel WhatsApp order)
     */
    const groupedByUmkm = useMemo(() => {
        const groups = {};
        cartItems.forEach((item) => {
            const umkmId = item.umkm?.id || 'default';
            if (!groups[umkmId]) {
                groups[umkmId] = {
                    umkm: item.umkm,
                    items: [],
                    subtotal: 0,
                };
            }
            groups[umkmId].items.push(item);
            groups[umkmId].subtotal += (Number(item.price) || 0) * (item.quantity || 1);
        });
        return Object.values(groups);
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalCount,
                totalPrice,
                groupedByUmkm,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
