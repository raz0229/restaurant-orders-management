
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-blue': '#a6b6d8',
        'dark-bg': '#1c1c21',
        'dark-p': '#babdc5',
        'light-p': '#9d99e6',
        'light-header': '#adbcd1',
        'dark-indigo-button': '#5e58d5',
        'dark-indigo': '#2c2eaf',
        'dark-body-bg': '#1f1f1f',
        'std-black-bg': '#2e2e2e',
        'red-ribbon': '#e85e68',
        'dark-red-ribbon': '#bc2f38',
        'review-title': '#b3bccb',
        'stars-yellow': '#e6d699'
      }
    },
  },
  plugins: [
  //  require('tailwindcss/aspect-ratio')
  ],
}
