module.exports = {
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#0e0e0e'
    }),
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        'primary': '#0e0e0e',
        pink: '#f64a8a',
        'code-grey': '#1f2937',
        'code-grey-light': '#121821'
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  variants: {
    extend: {
      textDecorationPlugin: ['dark', 'hover', 'responsive', 'group-hover'],
    },
  },
  plugins: [require('@downwindcss/text-decoration')],
}
