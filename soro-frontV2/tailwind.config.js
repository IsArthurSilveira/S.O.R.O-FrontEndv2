/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Garante que o Tailwind procure classes nos arquivos React
  ],
  theme: {
    extend: {
        colors: {
        // Renomeando para refletir o uso
        'bg': '#FFFFFF', // Cor de fundo da sidebar
        'text': '#111827', // Um cinza bem escuro (quase preto) para o texto
        'hover-bg': '#153499', // Cor base para o hover
        'active-bg': '#003CFF', // Cor base para o active

        // Mantendo cores primárias e de perigo, se precisar em outros lugares
        'soro-primary': {
          DEFAULT: '#003CFF', // Usando o azul do active como primário
          dark: '#002b80',    // Variação escura (exemplo)
          light: '#6691ff',   // Variação clara (exemplo)
        },

        'soro-danger': {
          DEFAULT: '#DC2626', // red-600
          dark: '#B91C1C',    // red-700
        },
      },
      
      fontFamily: {
        // Define 'sans' como a família padrão, usando 'Poppins'
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', /* ...outros fallbacks */ ],
      },
    },
  },
  plugins: [],
}