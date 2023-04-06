import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

const regex = /(.*node_modules\/)([^\/]+)(.*)/;
export default defineConfig({
    plugins: [react(), eslint()],
    base: '/admin/',
    server: {
        port: (process.env as any).PORT,
    },
    preview: {
        port: (process.env as any).PORT,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id, meta) => {
                    if (id.includes('node_modules')) {
                        const name = id.match(regex)[2].replace('@', '');
                        if (meta.getModuleInfo(id).isIncluded) return name;
                    }
                },
            },
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
