module.exports = {
  purge: ['./pages/**/*.tsx'],
  darkMode: false,
  theme: {
    container: {
      center: true,
      padding: {
        default: '1.5rem',
        sm: '1.5rem',
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
      muli: 'Muli, "Helvetica Neue", "Gill Sans", "Gill Sans MT", Calibri, sans-serif',
      lora: 'Lora, Georgia, serif',
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
};
