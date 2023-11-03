/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['src/**/*.vue', './index.html'],
	theme: {
	  extend: {
		screens: {
		  mb: { 'max': '869px' },
		  md: { 'min': '869px' }
		},
		colors: {
		  navyBlue: '#000080', // Cambia este valor al código de color de tu azul marino preferido
		  vibrantGradient1: '#FF00FF', // Cambia estos valores a tus colores preferidos
		  vibrantGradient2: '#00FFFF',
		},
		backgroundImage: {
		  'glass': 'linear-gradient(-45deg, transparent, #ffffff40)',
		  'load': 'linear-gradient(90deg, #121214, transparent 90%)',
		  'custom': 'linear-gradient(-45deg, var(--navyBlue), var(--vibrantGradient2))',
		}
	  },
	},
	plugins: [],
  }
  