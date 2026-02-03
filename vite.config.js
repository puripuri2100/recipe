import { defineConfig } from 'vite'
import recipes from './src/generated/recipes.json'

const inputs = {
  main: 'index.html',
  404: '404.html',
}

for (const r of recipes) {
  inputs[`recipe-${r.id}`] = `./recipes/${r.id}/index.html`
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: inputs,
    },
  },
  base: '/recipe/',
})
