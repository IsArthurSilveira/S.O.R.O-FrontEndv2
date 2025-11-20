// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // <-- NOVA IMPORTAÇÃO
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(), // <-- NOVO PLUGIN ADICIONADO
  ],
});

