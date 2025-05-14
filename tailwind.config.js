/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // مخصوص App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // مخصوص Pages Router (در صورت استفاده)
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ✅ اضافه شده برای پشتیبانی از کلاس dark
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        retro: {
          bgDay: "#fdf6e3",
          bgNight: "#1a1a1a",
          textDay: "#000000",
          textNight: "#00ff90",
        },
      },
    },
  },
  plugins: [],
}