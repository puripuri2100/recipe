import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import recipes from './src/generated/recipes.json'

const inputs = {
  main: 'index.html',
  404: '404.html',
}

for (const r of recipes) {
  inputs[`recipe-${r.id}`] = `./r/${r.id}/index.html`
}

export default defineConfig(({ mode }) => {
  let base = '/'

  // 本番環境だけ置き換え
  if (mode == 'production') {
    base = '/recipe/'
  }

  return {
    build: {
      rollupOptions: {
        input: inputs,
      },
    },
    base,
    plugins: [tailwindcss()],
  }
})
