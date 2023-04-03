import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    base: '/admin/',
    server: {
        port: (process.env as any).PORT,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        if (id.includes('react')) return 'vendor-react';
                        if (id.includes('ra-')) return 'vendor-ra';
                        if (id.includes('lodash')) return 'vendor-lodash';
                        if (id.includes('mui')) return 'vendor-mui';
                        return 'vendor-all';
                    }
                }
            }
        },
        outDir: 'build',
        minify: 'terser',
        terserOptions: {
            ecma: 2018,
            compress: {
                ecma: 2018,
            },
            format: {
                ecma: 2018,
            },
        },
    },
});