// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", //
  ],
  theme: {
    extend: { //
      colors: { //
        'bgWhite': '#FFFFFF', // Cor de fundo da sidebar
        'text': '#111827', // Cor do texto principal
        'hover-bg': '#F3F4F6', // Cinza claro para hover (ajustado para mais sutileza)
        'active-bg': '#E0E7FF', // Azul/Índigo bem claro para fundo ativo (ajustado)

        'soro-primary': {
          DEFAULT: '#003CFF', // Azul principal (mantido)
          dark: '#002680', // Variação escura
          light: '#E0E7FF', // Ex: indigo-100 do Tailwind padrão
        },
        'soro-danger': { 
          DEFAULT: '#DC2626', 
          dark: '#B91C1C', 
        },
      },
      fontFamily: { //
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'], //
      },
    },
  },
  plugins: [],
}