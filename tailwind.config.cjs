
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-blue': '#a6b6d8',
        'dark-blue-400': '#2b65ab',
        'dark-bg': '#1c1c21',
        'dark-p': '#babdc5',
        'light-p': '#9d99e6',
        'light-header': '#adbcd1',
        'light-grn': '#99e6b8',
        'light-yellow': '#e6cd99',
        'light-red': '#e69999',
        'light-inidgo': '#999ae6',
        'dark-indigo-button': '#5e58d5',
        'dark-indigo': '#2c2eaf',
        'dark-green-bg': '#196634',
        'dark-body-bg': '#1f1f1f',
        'std-black-bg': '#2e2e2e',
        'red-ribbon': '#e85e68',
        'dark-red-ribbon': '#bc2f38',
        'review-title': '#b3bccb',
        'stars-yellow': '#e6d699',
        'list-item': '#b6bec8',
        'list-item-bg': '#242424',
        'list-item-price': '#bfbfbf',
        'dark-border': '#303030',
        'dark-card': '#1f2937',
        'dark-border-gray': '#3a414a',
        'semi-gray': '#30303080',
        'char-count': '#b8bdc6',
        'input-border': '#616161'
      }
    },
    animation: {
      'ping-slow': 'ping 2s linear infinite',
    }
  },
  plugins: [
  //  require('tailwindcss/aspect-ratio')
  ],
}
