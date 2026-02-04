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
        <a href="${base}recipes/${r.id}/" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-all duration-300 group no-underline">
          <h2 class="mb-2 font-bold">${escapeHtml(r.title)}</h2>
          <p>所要時間：${r.cookTimeMinutes}分</p>
        </a>
      </li>
    `
    )
    .join('')
}

export function renderIndexPage(root: HTMLElement) {
  const data = recipes as Recipe[]

  root.innerHTML = `
    <article class="mt-5 mx-5">
      <div class="flex items-end">
        <h1 class="text-2xl font-sans">レシピ帳</h1>
        <div class="ml-3">
          <p class="text-sm text-gray-500">自分だけのレシピサイト</p>
        </div>
      </div>

      <div class="mx-5 my-15">
        <fieldset>
          <legend>検索</legend>
            <div>
            <div class="flex">
              <p class="">季節</p>
              <div class="ml-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-2">
                <div ><input type="checkbox" name="season_spring" id="season_spring" value="season_spring" checked/><label for="season_spring" class="ml-2">春</abel></div>
                <div><input type="checkbox" name="season_summer" id="season_summer" value="season_summer" checked/><label for="season_summer" class="ml-2">夏</abel></div>
                <div><input type="checkbox" name="season_autumn" id="season_autumn" value="season_autumn" checked/><label for="season_autumn" class="ml-2">秋</abel></div>
                <div><input type="checkbox" name="season_winter" id="season_winter" value="season_winter" checked/><label for="season_winter" class="ml-2">冬</abel></div>
                <div><input type="checkbox" name="season_new_year" id="season_new_year" value="season_new_year"/><label for="season_new_year" class="ml-2">正月</abel></div>
              </div>
            </div>
            <div class="flex mt-4">
              <p class="">種類</p>
              <div class="ml-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
                <div ><input type="checkbox" name="type_meal" id="type_meal" value="type_meal" checked/><label for="type_meal" class="ml-2">肉</abel></div>
                <div ><input type="checkbox" name="type_fish" id="type_fish" value="type_fish" checked/><label for="type_fish" class="ml-2">魚</abel></div>
                <div ><input type="checkbox" name="type_syusai" id="type_syusai" value="type_syusai" checked/><label for="type_syusai" class="ml-2">主菜</abel></div>
                <div><input type="checkbox" name="type_hukusai" id="type_hukusai" value="type_hukusai" checked/><label for="type_hukusai" class="ml-2">副菜</abel></div>
                <div ><input type="checkbox" name="type_syusyoku" id="type_syusyoku" value="type_syusyoku" checked/><label for="type_syusyoku" class="ml-2">主食</abel></div>
                <div ><input type="checkbox" name="type_shirumono" id="type_shirumono" value="type_shirumono" checked/><label for="type_shirumono" class="ml-2">汁物</abel></div>
                <div ><input type="checkbox" name="type_tsumami" id="type_tsumami" value="type_tsumami"/><label for="type_tsumami" class="ml-2">おつまみ</abel></div>
                <div ><input type="checkbox" name="type_okashi" id="type_okashi" value="type_okashi"/><label for="type_okashi" class="ml-2">お菓子</abel></div>
                <div ><input type="checkbox" name="type_bentou" id="type_bentou" value="type_bentou"/><label for="type_bentou" class="ml-2">弁当用</abel></div>
                <div ><input type="checkbox" name="type_other" id="type_other" value="type_other"/><label for="type_other" class="ml-2">その他</abel></div>
              </div>
            </div>
            <div class="flex items-center mt-4">
              <p>キーワード</p>
              <input
                class="ml-2 block min-w-50 p-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                type="search"
                id="search"
                placeholder="レシピ名・材料・タグ"
              />
            </div>
          </div>
        </fieldset>
      </div>


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
