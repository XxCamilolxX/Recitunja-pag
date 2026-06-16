/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#60df78', // verdecito primary
          container: '#2eb453',
          dark: '#228b3f',
        },
        secondary: {
          DEFAULT: '#b5ccbf',
          dark: '#061a12', // secondary dark green
        },
        surface: {
          DEFAULT: '#131313',
          bright: '#393939',
          low: '#1c1b1b',
          high: '#2a2a2a',
          highest: '#353535',
        },
        cream: {
          DEFAULT: '#f5f0eb',
        },
        recycle: {
          carton: '#C8A165',
          plastico: '#4CAEE3',
          vidrio: '#7DC98F',
          metal: '#A0A0A0',
          papel: '#F5D76E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
