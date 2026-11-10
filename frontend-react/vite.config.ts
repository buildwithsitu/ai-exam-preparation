import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            // When Flask backend is offline on port 5000, prevent noisy terminal stack traces
            // and return a clean 503 JSON payload to the browser.
            const httpRes = res as any;
            if (httpRes && !httpRes.headersSent) {
              httpRes.writeHead(503, { 'Content-Type': 'application/json' });
              httpRes.end(JSON.stringify({
                success: false,
                status: 'unhealthy',
                error: {
                  code: 'BACKEND_OFFLINE',
                  message: 'Flask backend is offline on 127.0.0.1:5000. Start it using ./start.sh or python backend/run.py, or click Explore as Demo Student.'
                }
              }));
            }
          });
        },
      },
    },
  },
});
