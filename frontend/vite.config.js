import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5174, // Frontend port
//     proxy: {
//       '/auth': {
//         target: 'http://localhost:5000', // Backend server
//         changeOrigin: true,
//         secure: false,
//       },
//       alias: {
//         "@": path.resolve(__dirname, "src"), // Add this line
//       },
//     },
//   },
  
// });

