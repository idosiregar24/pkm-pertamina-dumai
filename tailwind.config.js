import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: [
                    '"Plus Jakarta Sans"',
                    'Inter',
                    'Figtree',
                    ...defaultTheme.fontFamily.sans,
                ],
                heading: [
                    '"Plus Jakarta Sans"',
                    'Inter',
                    'sans-serif',
                ],
            },
            colors: {
                pertamina: {
                    red: '#ED1C24',
                    'red-dark': '#C9141B',
                    'red-light': '#FEE2E2',
                    blue: '#005BAC',
                    'blue-dark': '#004785',
                    'blue-light': '#EBF4FC',
                    green: '#00A651',
                    'green-dark': '#008F45',
                    'green-light': '#E8F7EE',
                },
                shopee: {
                    DEFAULT: '#EE4D2D',
                    dark: '#D73217',
                    light: '#FFF1EE',
                },
            },
            boxShadow: {
                subtle: '0 2px 10px rgba(15, 23, 42, 0.04)',
                'subtle-hover': '0 10px 25px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
            },
        },
    },

    plugins: [forms],
};
