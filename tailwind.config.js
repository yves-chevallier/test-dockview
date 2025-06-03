export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}", // adapter selon votre structure
  ],
  theme: {
    extend: {
        colors: {
            success: 'var(--success)',
            error: 'var(--destructive)',
        },
    },
  },
  plugins: [],
};
