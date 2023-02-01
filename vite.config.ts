
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	resolve: { alias: { '@': '/src' } },
	plugins: [sveltekit()],
	server: {
        host: true,
        port: 5173
    }
};

export default config;
