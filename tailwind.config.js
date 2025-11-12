/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007AFF",
        secondary: "#E8F0FF",
        success: "#00C26F",
        "text-dark": "#0F0F0F",
        "text-muted": "#5F6368",
        "bg-light": "#F5F5F7",
        white: "#FFFFFF"
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.04)',
        md: '0 4px 10px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
