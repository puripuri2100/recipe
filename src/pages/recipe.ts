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
      <a href="${base}">← 一覧に戻る</a>
    `
    return
  }

  root.innerHTML = `
    <div class="flex flex-row justify-center">
      <div class="flex-col w-full lg:max-w-250">
        <header class="mx-5 mt-4">
          <a class="underline underline-offset-4" href="${base}">← レシピ一覧に戻る</a>
        </header>
        <article class="recipe mx-5 mt-10 mb-5">
          <div class="flex items-end justify-between">
            <h1 class="text-3xl font-serif">${escapeHtml(recipe.title)}</h1>
          ${recipe.tags.length == 0 ? '' : `<p class="my-5">${recipe.tags.join('，')}</p>`}
            <p class="ml-5 font-bold text-sm mt-5">調理時間：${recipe.cookTimeMinutes}分</p>
          </div>
          <p class="font-serif text-md mt-4">${escapeHtml(recipe.description)}</p>

          <section>
            <h2 class="font-serif text-xl mt-7">材料（${recipe.numbers}食分）</h2>
            <hr class="mt-1 mb-3" />
            <ul class="ml-1">
              ${Object.entries(recipe.ingredients)
                .map(
                  ([k, v]) =>
                    `<li class="text-lg my-2"><input class="mr-2" type="checkbox" />${escapeHtml(k)}：${escapeHtml(v)}</li>`
                )
                .join('')}
            </ul>
          </section>

          ${
            recipe.memo
              ? `
            <section>
              <h2 class="font-serif text-xl mt-7">メモ</h2>
              <hr class="mt-1 mb-3" />
              <p class="font-serif text-md mb-4">${recipe.memo}</p>
            </section>
            `
              : ''
          }

          <section>
            <h2 class="font-serif text-xl mt-7">作り方</h2>
            <hr class="mt-1 mb-3" />
            <div class="steps">
              ${marked.parse(recipe.body)}
            </div>
          </section>
        </article>
        <footer class="mx-5 mt-4 mb-10">
          <a class="underline underline-offset-4" href="${base}">← レシピ一覧に戻る</a>
        </footer>
      </div>
    </div>
  `
}
