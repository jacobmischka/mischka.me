import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-only';

function getConfig(chunkName) {
	return {
		input: `src/_includes/js/${chunkName}.js`,
		output: {
			file: `_site/dist/${chunkName}.js`,
			format: 'iife',
		},
		plugins: [
			svelte(),
			resolve({ browser: true }),
			commonjs(),
			css({ output: `${chunkName}.css` }),
		],
	};
}

export default getConfig('main');
