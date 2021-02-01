module.exports = {
  purge: ['./pages/**/*.tsx'],
  darkMode: false,
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.5rem',
        sm: '1rem',
        md: '1rem',
        lg: '1rem',
        xl: '1rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '768px',
      xl: '768px',
    },
    fontFamily: {
      sans: 'Inter, "Helvetica Neue", "Gill Sans", "Gill Sans MT", Calibri, sans-serif',
      serif: 'Lora, Georgia, serif',
      inter: 'Inter, "Helvetica Neue", "Gill Sans", "Gill Sans MT", Calibri, sans-serif',
      lora: 'Lora, Georgia, serif',
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
