import type { Config } from 'tailwindcss';

export default <Config>{
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pinkPrimary: '#FFC1E3',
        rose: '#FF8FB1',
        blush: '#FFD6E8',
        lavender: '#E6D6FF',
        cream: '#FFF9FC',
        gold: '#FFD700',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
