
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
        host: true,
        port: 5173
    },
    preview: {
        port: 5173
    }
};

export default config;
