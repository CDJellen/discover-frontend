import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {

	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			pages: "frontend",
			assets: "frontend",
			fallback: "index.html",
		})
	}

};

export default config;
