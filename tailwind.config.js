/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      zIndex:{
        'minus-1': '-1',
        'minus-2': '-2',
      },
      boxShadow: {
        'bg': '0 0 1000px 100px rgba(0,0,0,0.9) inset'
      },
      screens: {
        "xxs": { min: '0px', max: '400px'},
        "m-low": { min: '100px', max: '800px' },
        "m-medium": { min: '800px', max: '1300px'},
        "m-high": { min: '1300px', max: '1800px'},
        "sidebar-collapse-min": { min: "801px" },
        "sidebar-collapse-max": { max: "800px" },
        "ant-xs": { max: '480px' },
        "ant-sm": { max: '576px' },
        "ant-md": { max: '768px' },
        "ant-lg": { max: '992px' },
        "ant-xl": { max: '1200px' },
        "ant-xxl": { max: '1600px' },
      }, 
      colors: {
        'color-main': '#2C3440',
        'color-main-alternate': "#1D2028",
        'main-orange': '#E3951E',
        'main-deep-orange': '#D78D19',
        'light-orange': '#FFB800',
        'light-font': "#B5B8BC",
      },
      fontFamily: {
        'poppins': ['var(--font-poppins)'],
        'work-sans': ['Work Sans', 'sans-serif']
      },
      keyframes: {
        shake: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(3.5deg)' },
          '20%': { transform: 'rotate(-2deg)' },
          '30%': { transform: 'rotate(3.5deg)' },
          '40%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(3.5deg)' },
          '60%': { transform: 'rotate(-1deg)' },
          '70%': { transform: 'rotate(2.5deg)' },
          '80%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      animation: {
        shake: 'shake 1s',
      },
      gridTemplateColumns:{
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
        'span-21': 'span 21 / span 21',
        'span-22': 'span 22 / span 22',
        'span-23': 'span 23 / span 23',
        'span-24': 'span 24 / span 24',
      },
      gridColumnStart: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
        '18': '18',
        '19': '19',
        '20': '20',
        '21': '21',
        '22': '22',
        '23': '23',
        '24': '24',
      },
      gridColumnEnd: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
        '18': '18',
        '19': '19',
        '20': '20',
        '21': '21',
        '22': '22',
        '23': '23',
        '24': '24',
      },
      fontSize: {
        "xxs": "8px"
      }
    },
    plugins: [],
  }
}