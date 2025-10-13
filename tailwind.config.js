/** @type {import('tailwindcss').Config} */
module.exports = {
  // ডার্ক মোডকে 'class' ভিত্তিক করা হয়েছে, যা ম্যানুয়াল টগলিং সহজ করবে
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ইন্টার ফন্ট যোগ করা হলো
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // কাস্টম রং প্যালেট (আধুনিক, মিনিমাল টোন)
      colors: {
        'primary-light': '#8b5cf6', // Indigo-500
        'primary-dark': '#4f46e5',  // Indigo-600
        'bg-light': '#f9fafb',   // Gray-50
        'bg-dark': '#0f172a',    // Slate-900
        'card-dark': '#1e293b',  // Slate-800
      },
      // বক্স শ্যাডো
      boxShadow: {
        'neon': '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.2)',
      }
    },
  },
  plugins: [],
}
