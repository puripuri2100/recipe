import type { Typ, Season, Recipe } from './recipe'

export interface FilterCondition {
  query: string
  seasons: (keyof Season)[]
  types: (keyof Typ)[]
}

export function filterRecipes(recipes: Recipe[], cond: FilterCondition): Recipe[] {
  const q = cond.query

  return recipes.filter((r) => {
    // --- キーワード検索 ---
    const matchQuery =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      Object.keys(r.ingredients).some((i) => i.toLowerCase().includes(q)) ||
      r.tags.some((t) => t.toLowerCase().includes(q))

    if (!matchQuery) return false

    // --- 季節フィルタ ---
    const matchSeason = cond.seasons.length === 0 || cond.seasons.some((s) => r.season?.[s])

    if (!matchSeason) return false

    // --- 種類フィルタ ---
    const matchType = cond.types.length === 0 || cond.types.some((t) => r.typ?.[t])

    return matchType
  })
}
