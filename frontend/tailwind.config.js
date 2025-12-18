/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#f97316', // Orange 500
                secondary: '#f59e0b', // Amber 500
                dark: '#fff7ed', // Orange 50 (Warm cream/soft orange base)
                card: '#ffffff', // White
            }
        },
    },
    plugins: [],
}
