import recipes from '../generated/recipes.json'
import type { Recipe } from '../lib/recipe'
import { escapeHtml } from '../lib/escape'

const base = import.meta.env.BASE_URL

function filterRecipes(recipes: Recipe[], query: string): Recipe[] {
  if (!query) return recipes

  return recipes.filter(
    (r) =>
      r.title.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.ingredients.some((i) => i.toLowerCase().includes(query)) ||
      r.tags.some((t) => t.toLowerCase().includes(query))
  )
}

function renderList(recipes: Recipe[]): string {
  if (recipes.length === 0) {
    return `<li class="empty">該当するレシピがありません</li>`
  }

  return recipes
    .map(
      (r) => `
      <li class="recipe-card">
        <a href="${base}recipes/${r.id}/">
          <h2>${escapeHtml(r.title)}</h2>
          <p class="description">${escapeHtml(r.description)}</p>
          <p class="meta">
            ⏱ ${r.cookTimeMinutes}分
            ${r.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
          </p>
        </a>
      </li>
    `
    )
    .join('')
}

export function renderIndexPage(root: HTMLElement) {
  const data = recipes as Recipe[]

  root.innerHTML = `
    <article class="index">
      <h1 class="">レシピ帳</h1>
      <input
        type="search"
        id="search"
        placeholder="レシピ名・材料・タグで検索"
      />

      <ul id="recipe-list" class="recipe-list">
        ${renderList(data)}
      </ul>
    </article>
  `

  const input = root.querySelector<HTMLInputElement>('#search')!
  const list = root.querySelector<HTMLUListElement>('#recipe-list')!

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase()
    const filtered = filterRecipes(data, q)
    list.innerHTML = renderList(filtered)
  })
}
