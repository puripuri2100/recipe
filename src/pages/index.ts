import recipes from '../generated/recipes.json'
import type { Recipe, Season, Typ } from '../lib/recipe'
import { filterRecipes } from '../lib/filter'
import type { FilterCondition } from '../lib/filter'
import { escapeHtml } from '../lib/escape'

const base = import.meta.env.BASE_URL

// チェックボックスの値収集
function getCheckedValues<T extends string>(
  root: HTMLElement,
  selector: string,
  map: Record<string, T>
): T[] {
  return Array.from(root.querySelectorAll<HTMLInputElement>(selector))
    .filter((el) => el.checked)
    .map((el) => map[el.id])
}

// ID -> メタデータキー
const seasonMap = {
  season_spring: '春',
  season_summer: '夏',
  season_autumn: '秋',
  season_winter: '冬',
  season_new_year: '正月',
} satisfies Record<string, keyof Season>

// ID -> メタデータキー
const typeMap = {
  type_meal: '肉',
  type_fish: '魚',
  type_syusai: '主菜',
  type_hukusai: '副菜',
  type_syusyoku: '主食',
  type_shirumono: '汁物',
  type_tsumami: 'おつまみ',
  type_okashi: 'お菓子',
  type_bentou: '弁当用',
  type_other: 'その他',
} satisfies Record<string, keyof Typ>

// ランダムで並び替える
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array] // 元の配列を破壊しない場合
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

function renderList(recipes: Recipe[]): string {
  if (recipes.length === 0) {
    return `<li class="empty">該当するレシピがありません</li>`
  }
  const random = shuffleArray(recipes)
  return random
    .map((r) => {
      const i = Object.keys(r.ingredients).slice(0, 2).join('，')
      return `
      <li class="recipe-card">
        <a href="${base}r/${r.id}/" class="block h-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-all duration-300">
          <h2 class="mb-2 font-bold">${escapeHtml(r.title)}</h2>
          <p>所要時間：${r.cookTimeMinutes}分</p>
          <p>主な材料：${i}</p>
        </a>
      </li>
    `
    })
    .join('')
}

export function renderIndexPage(root: HTMLElement) {
  const data = recipes as Recipe[]

  root.innerHTML = `
    <div class="flex flex-row justify-center">
      <div class="flex-col w-full lg:max-w-250">
        <article class="mt-5 mx-5 my-10">
          <div class="flex items-end justify-between">
            <div class="flex items-end">
              <h1 class="text-2xl font-sans">レシピ帳</h1>
              <div class="ml-3">
                <p class="text-sm text-gray-500">自分だけのレシピサイト</p>
              </div>
            </div>
            <div>
              <a href="https://github.com/puripuri2100/recipe"><img class="w-7 h-7 object-scale-down mr-1 translate-y-1" src="${base}GitHub_Invertocat_Black_Clearspace.png" alt="GitHub repository link"/></a>
            </div>
          </div>
          <hr class="mt-2"/>

          <div class="mt-10 mt-10 mb-15">
            <fieldset class="relative mt-8 rounded-xl border border-gray-200 bg-white px-6 pb-6 pt-8 shadow-sm">
              <legend class="absolute -top-3 left-4 rounded-full bg-white px-3 text-sm font-semibold text-gray-700">
                検索
              </legend>
              <div class="space-y-6">
                <div class="flex flex-col gap-2 md:flex-row md:items-start">
                  <p class="w-20 text-sm font-medium text-gray-600">季節</p>
                  <div class="ml-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-2">
                    <div >
                      <input
                        type="checkbox"
                        name="season_spring"
                        id="season_spring"
                        value="season_spring"
                        checked
                      /><label for="season_spring" class="ml-2">春</abel>
                    </div>
                    <div><input type="checkbox" name="season_summer" id="season_summer" value="season_summer" checked/><label for="season_summer" class="ml-2">夏</abel></div>
                    <div><input type="checkbox" name="season_autumn" id="season_autumn" value="season_autumn" checked/><label for="season_autumn" class="ml-2">秋</abel></div>
                    <div><input type="checkbox" name="season_winter" id="season_winter" value="season_winter" checked/><label for="season_winter" class="ml-2">冬</abel></div>
                    <div><input type="checkbox" name="season_new_year" id="season_new_year" value="season_new_year"/><label for="season_new_year" class="ml-2">正月</abel></div>
                  </div>
                </div>
                <div class="flex flex-col gap-2 md:flex-row md:items-start">
                  <p class="w-20 text-sm font-medium text-gray-600">種類</p>
                  <div class="ml-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-x-6 gap-y-2">
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
                <div class="flex flex-col gap-2 md:flex-row md:items-center">
                  <p class="w-20 text-sm font-medium text-gray-600">キーワード</p>
                  <input
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    type="search"
                    id="search"
                    placeholder="レシピ名・材料・タグ"
                  />
                </div>
              </div>
            </fieldset>
          </div>

          <ul id="recipe-list" class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            ${renderList(data)}
          </ul>
        </article>
      </div>
    </div>
  `

  const input = root.querySelector<HTMLInputElement>('#search')!
  const list = root.querySelector<HTMLUListElement>('#recipe-list')!

  const checkboxes = root.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')

  function update() {
    const cond: FilterCondition = {
      query: input.value.trim().toLowerCase(),
      seasons: getCheckedValues(root, '[id^="season_"]', seasonMap),
      types: getCheckedValues(root, '[id^="type_"]', typeMap),
    }

    const filtered = filterRecipes(data, cond)
    list.innerHTML = renderList(filtered)
  }

  input.addEventListener('input', update)
  checkboxes.forEach((cb) => cb.addEventListener('change', update))
}
