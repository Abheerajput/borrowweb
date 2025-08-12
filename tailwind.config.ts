/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {

        'sx': {'min': '318px', 'max': '576.99px'},
        'xs': {'min': '318px', 'max': '768.99px'},
        'sm': {'min': '769px', 'max': '1024.99px'}, 
        'md': {'min': '1025px', 'max': '1280.99px'},
        'lg': {'min': '1281px', 'max': '1438.99px'}, 
        'xl': {'min': '1438.99px'}, 
       
      },
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
        geist: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      keyframes: {
        "slide-in-from-inside": {
          "0%": { opacity: 0, transform: "scale(0.8)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
         marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      }
    },
   
    animation: {
      "slide-in-from-inside": "slide-in-from-inside 0.5s ease-out forwards",
      spin: 'spin 1s linear infinite',
      marquee: 'marquee 25s linear infinite',
    },
  },
  plugins: [],
}