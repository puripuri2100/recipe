export function renderNotFoundPage(root: HTMLElement) {
  const base = import.meta.env.BASE_URL
  root.innerHTML = `
    <div
      class="flex min-h-screen items-center justify-center px-4"
    >
      <main
        class="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm"
      >
        <p class="text-sm font-semibold text-gray-400">
          404 Not Found
        </p>

        <h1 class="mt-2 text-2xl font-bold text-gray-800">
          ページが見つかりません
        </h1>

        <p class="mt-4 text-sm text-gray-600 leading-relaxed">
          お探しのレシピは存在しないか、<br />
          URL が変更された可能性があります。
        </p>

        <div class="mt-6 flex flex-col gap-3">
          <a
            href="${base}"
            class="inline-flex justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-400"
          >
            ← トップページへ戻る
          </a>
        </div>
      </main>
    </div>
  `
}
