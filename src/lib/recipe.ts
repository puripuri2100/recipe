// レシピ情報
export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  cookTimeMinutes: number
  tags: string[]
  body: string
}
