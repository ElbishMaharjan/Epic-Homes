import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {   
  proxy: {    //proxy allows you to redirect certain requests to a different server during development. This is useful, for example, when your frontend application needs to communicate with a backend API running on a separate server.
    '/api': {  // each time the address starts with /api add the localhost 3000 at the beginning
      target: 'http://localhost:3000',
      secure: false,
    },
  },
},

  plugins: [react()],
});
