module.exports = {
  purge: ['./pages/**/*.tsx'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        // cream: '#faf3e1',
        cream: '#f9f6f1',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
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
      // sans:
      //   'Inter, "Helvetica Neue", "Gill Sans", "Gill Sans MT", Calibri, sans-serif',
      sans:
        'Muli, "Helvetica Neue", "Gill Sans", "Gill Sans MT", Calibri, sans-serif',
      serif: 'Lora, Georgia, serif',
      inter:
        'Inter, "Helvetica Neue", "Gill Sans", "Gill Sans MT", Calibri, sans-serif',
      lora: 'Lora, Georgia, serif',
      muli:
        'Muli, "Helvetica Neue", "Gill Sans", "Gill Sans MT", Calibri, sans-serif',
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
