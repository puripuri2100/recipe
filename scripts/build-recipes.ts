import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function generateHtml(id: string, title: string, description: string): string {
  return `
<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>

  <!-- OGP -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="/recipe/ogp/${id}.png" />
  <meta property="og:url" content="/recipe/r/${id}/" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />

  <script type="module" src="/src/main.ts"></script>
</head>
<body>
  <div id="app" data-recipe-id="${id}"></div>
</body>
</html>
`
}

const dir = 'src/recipes'
const out = 'src/generated/recipes.json'
const recipesDir = 'r'

const files: string[] = fs.readdirSync(dir)

const recipes = []

const fileRe = /(.+).md/

for (let i = 0; i < files.length; i++) {
  const file = files[i]
  const fileReArray = fileRe.exec(file.trim())
  if (fileReArray && fileReArray.length > 0) {
    const id = fileReArray[1]
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    recipes.push({ ...data, id, body: content })
    const html = generateHtml(id, data.title, data.description)
    const dir2 = path.join(recipesDir, id)
    fs.mkdirSync(dir2, { recursive: true })
    fs.writeFileSync(path.join(dir2, 'index.html'), html)
  }
}

fs.writeFileSync(out, JSON.stringify(recipes, null, 2))
