// 季節情報
export interface Season {
  春?: boolean
  夏?: boolean
  秋?: boolean
  冬?: boolean
  正月?: boolean
}

export interface Typ {
  肉?: boolean
  魚?: boolean
  主菜?: boolean
  副菜?: boolean
  主食?: boolean
  汁物?: boolean
  おつまみ?: boolean
  お菓子?: boolean
  弁当用?: boolean
  その他?: boolean
}

export type Ingredients = Record<string, string | number | undefined>

// レシピ情報
export interface Recipe {
  id: string
  title: string
  description: string
  numbers?: number
  ingredients: Ingredients
  cookTimeMinutes: number
  season: Season
  typ: Typ
  tags: string[]
  memo?: string
  body: string
}
