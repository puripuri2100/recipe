export function renderNotFoundPage(root: HTMLElement) {
  const base = import.meta.env.BASE_URL
  root.innerHTML = `
    <section class="not-found">
      <h1>404 - ページが見つかりません</h1>
      <p>URL が間違っているか、レシピが削除された可能性があります。</p>
      <a href="${base}">レシピ一覧に戻る</a>
    </section>
  `
}
