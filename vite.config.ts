import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

const regex = /(.*node_modules\/)([^\/]+)(.*)/;

const linter = process.env.VITE_ENV === 'prod' ? [] : [eslint()];
export default defineConfig({
    plugins: [react(), ...linter],
    base: '/admin/',
    css: {
        devSourcemap: process.env.VITE_SOURCE_MAP === 'true',
    },
    server: {
        port: (process.env as any).PORT,
    },
    preview: {
        port: (process.env as any).PORT,
    },
    build: {
        sourcemap: process.env.VITE_SOURCE_MAP === 'true',
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
        minify: 'terser',
        terserOptions: {
            sourceMap: process.env.VITE_SOURCE_MAP === 'true',
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
