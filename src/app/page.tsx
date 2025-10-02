import Link from 'next/link';

const features = [
  {
    title: '功能展示',
    description: '展示 Streamdown 支援的所有 Markdown 功能，包含 GFM、程式碼高亮、LaTeX 數學公式和 Mermaid 圖表',
    href: '/demo',
    icon: '🎨',
  },
  {
    title: 'AI 聊天',
    description: '與 AI 助手對話，體驗 Streamdown 在即時串流場景中的渲染能力',
    href: '/chat',
    icon: '💬',
  },
  {
    title: '技術文件',
    description: '查看完整的微服務架構技術文件範例，包含架構圖、流程圖、狀態圖等',
    href: '/docs',
    icon: '📚',
  },
  {
    title: 'Markdown 編輯器',
    description: '即時編輯和預覽 Markdown，支援所有進階功能',
    href: '/editor',
    icon: '✏️',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-white">Streamdown Demo</h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            探索 Streamdown 的強大功能 - 專為 AI 串流場景設計的 React Markdown 渲染函式庫
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group rounded-2xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:bg-gray-800"
            >
              <div className="mb-4 text-5xl">{feature.icon}</div>
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{feature.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              <div className="mt-4 flex items-center text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400">
                <span className="font-medium">立即體驗</span>
                <svg
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">核心功能</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">GitHub Flavored Markdown</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">完整支援 GFM 語法</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">程式碼語法高亮</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">使用 Shiki 引擎</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">LaTeX 數學公式</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">支援行內和區塊公式</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Mermaid 圖表</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">流程圖、時序圖等</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">串流渲染</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">處理不完整的 Markdown</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">安全防護</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">防止 prompt injection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">Built with Next.js 15, React 19, TypeScript, and Tailwind CSS</p>
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://streamdown.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Streamdown 文件
            </a>
            <span>•</span>
            <a
              href="https://ai-sdk.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Vercel AI SDK
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
