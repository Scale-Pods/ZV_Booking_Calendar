import { defineConfig, loadEnv } from 'vite';

function proxyRule(envUrl) {
  const url = new URL(envUrl);
  return {
    target: url.origin,
    changeOrigin: true,
    secure: false,
    configure: (proxy) => {
      proxy.on('proxyReq', (proxyReq) => {
        const clientQs = proxyReq.path.includes('?') ? proxyReq.path.substring(proxyReq.path.indexOf('?') + 1) : '';
        const envQs = url.search.replace(/^\?/, '');
        const merged = [envQs, clientQs].filter(Boolean).join('&');
        proxyReq.path = url.pathname + (merged ? '?' + merged : '');
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    appType: 'spa',
    server: {
      proxy: {
        '/api/campaigns': proxyRule(env.VITE_ROLE_URL),
        '/api/slots': proxyRule(env.VITE_SLOTS_URL),
        '/api/book': proxyRule(env.VITE_BOOK_URL),
      }
    }
  };
});