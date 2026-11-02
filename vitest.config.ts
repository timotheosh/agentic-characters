import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [
        {
            name: 'html-string-loader',
            transform(code, id) {
                if (id.endsWith('.html')) {
                    return { code: `export default ${JSON.stringify(code)};`, map: null };
                }
            },
        },
    ],
    test: {
        environment: 'node',
    },
});
