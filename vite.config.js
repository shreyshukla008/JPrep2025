import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',    

  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        light: {
          background: '#F9FAFB',
          card: '#FFFFFF',
          text: '#111827',
          primary: '#4F46E5',
          secondary: '#6366F1',
          accent: '#10B981',
          border: '#E5E7EB',
        },
        dark: {
          background: '#111827',
          card: '#1F2937',
          text: '#F9FAFB',
          primary: '#6366F1',
          secondary: '#818CF8',
          accent: '#34D399',
          border: '#374151',
        },
      },
    },
    screens: {
      xs: '260px', // Custom breakpoint for 480px
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    historyApiFallback: true
  }
})
