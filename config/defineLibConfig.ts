import deepmerge from '@fastify/deepmerge';
import { defineConfig, type UserConfigExport } from 'vite';
import dts from 'vite-plugin-dts';
import viteTsconfigPaths from 'vite-tsconfig-paths';

const entryLib = './src/lib/index.ts';

const deepMerge = deepmerge();

export const defineLibConfig = (
	config: UserConfigExport,
	afterBuild?: (() => void | Promise<void>)
): UserConfigExport => defineConfig((originalConfig) => deepMerge(
	typeof config === 'function' ? config(originalConfig) : config,
	{
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: './src/setupTests.ts'
		},
		build: {
			minify: false,
			lib: {
				entry: entryLib,
				name: 'index',
				fileName: 'index',
				formats: ['cjs', 'es', 'umd']
			},
			outDir: './dist',
			rollupOptions: {
				output: {
					dir: './dist'
				},
				external: [
					'tsconfig-paths', 'typescript', 'path', 
					'fs', 'vite', 'url', 
					'crypto-js',
					'vue'
				]
			}
		},
		plugins: [
			viteTsconfigPaths(),
			dts({
				insertTypesEntry: true,
				rollupTypes: true,
				afterBuild
			})
		]
	}
));
