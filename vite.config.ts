import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { URL, fileURLToPath } from 'node:url'

const alias = [{ name: '@', path: './src' }]

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: alias.map(({ name, path }) => ({
			find: name,
			replacement: fileURLToPath(new URL(path, import.meta.url)),
		})),
	},
	plugins: [react()],
})
