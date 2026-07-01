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
          DEFAULT: '#5bbf7a',   // verde primario suave
          container: '#3da862', // medio
          dark: '#2a8a4a',      // oscuro para hover
          light: '#b8e6c7',     // pastel claro
        },
        secondary: {
          DEFAULT: '#a8cdb8',   // verde grisáceo claro
          dark: '#1e4d38',      // verde oscuro (más suave que antes)
        },
        surface: {
          DEFAULT: '#f0f7f3',   // casi blanco con toque verde
          bright: '#ffffff',
          low: '#e6f2eb',
          high: '#d4eade',
          highest: '#c2e2cc',
        },
        cream: {
          DEFAULT: '#eef8f2',   // crema con toque mint
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
        sans: ['Montserrat', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
