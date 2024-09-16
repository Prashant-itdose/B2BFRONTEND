import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    mode: 'development',
    plugins: [react()],
    resolve: {
      alias: {
        '@app': path.resolve(__dirname, './src'),
        '@store': path.resolve(__dirname, './src/store'),
        '@components': path.resolve(__dirname, './src/components'),
        '@modules': path.resolve(__dirname, './src/modules'),
        '@pages': path.resolve(__dirname, './src/pages'),
      },
    },
   server:{
  
    proxy: {
      '/B2B_API/API': {
        target: process.env.VITE_APP_REACT_APP_BASE_URL,
        changeOrigin: true,
      },
      
    }
    
   }
  });
};