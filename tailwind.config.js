const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./public/index.html"],
  theme: {
    extend: {
      colors: {
        customYellow: '#FEEA00',
        customGreen: '#11CC11',
        customRed: '#FF1111',
        customWhite: '#FEFADC',
        customBlue: '#140F30'
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif']
      },
      boxShadow: {
        'customShadow': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }
    },
    screens: {
      'xs': '375px',...defaultTheme.screens
    }
  },
  plugins: [],
}
