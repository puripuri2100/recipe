import recipes from '../generated/recipes.json'
import type { Recipe } from '../lib/recipe'
import { escapeHtml } from '../lib/escape'
import { marked } from 'marked'

const base = import.meta.env.BASE_URL

export function renderRecipePage(root: HTMLElement, recipeId: string) {
  marked.setOptions({
    gfm: true,
    breaks: true,
  })

  const recipe = (recipes as Recipe[]).find((r) => r.id === recipeId)

  if (!recipe) {
    root.innerHTML = `
      <h1>レシピが見つかりません</h1>
      <a href="${base}">一覧に戻る</a>
    `
    return
  }

  root.innerHTML = `
    <article class="recipe">
      <h1>${escapeHtml(recipe.title)}</h1>
      <p class="description">${escapeHtml(recipe.description)}</p>
      <p class="meta">
        ⏱ ${recipe.cookTimeMinutes}分
      </p>

      <section>
        <h2>材料</h2>
        <ul>
          ${recipe.ingredients
            .map((i) => `<li><input type="checkbox" />${escapeHtml(i)}</li>`)
            .join('')}
        </ul>
      </section>

      <section>
        <h2>作り方</h2>
        <div class="steps">
          ${marked.parse(recipe.body)}
        </div>
      </section>

      <footer>
        <a href="${base}">← レシピ一覧に戻る</a>
      </footer>
    </article>
  `
}
