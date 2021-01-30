module.exports = {
  purge: ['./pages/**/*.tsx'],
  darkMode: false,
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.5rem',
        sm: '1rem',
        md: '0rem',
        lg: '0rem',
        xl: '0rem',
      },
    },
    screens: {
      sm: '640px',
      md: '700px',
      lg: '700px',
      xl: '700px',
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
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
