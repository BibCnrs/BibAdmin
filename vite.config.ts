import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

const regex = /(.*node_modules\/)([^\/]+)(.*)/;
function hash(s) {
    let h = 0;
    for(let i = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    let hash = h.toString(16).replace('-', '');
    if (hash.length === 8) return hash;
    if (hash.length > 8) return hash.slice(0, 9);
    while (hash.length < 8) {
        h = Math.imul(31, h);
        hash = h.toString(16).replace('-', '');
    }
    if (hash.length > 8) return hash.slice(0, 9);
    return h.toString(16).replace('-', '');
}

// https://vitejs.dev/config/
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
                        if (meta.getModuleInfo(id).isIncluded) return hash(name);
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
