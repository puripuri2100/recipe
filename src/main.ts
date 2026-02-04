import './main.css'

import { renderRecipePage } from './pages/recipe'
import { renderIndexPage } from './pages/index'
import { renderNotFoundPage } from './pages/notFound'

function main() {
  const app = document.getElementById('app')
  if (!app) return

  const recipeId = app.dataset.recipeId
  const page = app.dataset.page
  console.log(page)

  if (page == '404') {
    renderNotFoundPage(app)
  } else if (recipeId) {
    // 各レシピ
    renderRecipePage(app, recipeId)
  } else {
    // index.html
    renderIndexPage(app)
  }
}

main()
