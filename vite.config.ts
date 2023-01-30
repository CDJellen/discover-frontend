
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server:
	{
		proxy:
		{
			'/api': 'http://localhost:7071'
		},
	}
};

export default config;
