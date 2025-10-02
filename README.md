# Streamdown Demo

這是一個展示 [Streamdown](https://streamdown.ai/) 功能的 Next.js 專案。Streamdown 是由 Vercel 開發的 React Markdown 渲染函式庫，專為 AI 串流應用設計。

## 功能展示

### 🎨 功能展示頁面 (`/demo`)

展示 Streamdown 支援的所有 Markdown 功能：

- GitHub Flavored Markdown (GFM)
- 程式碼語法高亮（使用 Shiki）
- LaTeX 數學公式
- Mermaid 圖表（流程圖、時序圖、類別圖）
- 任務清單、表格等

### 💬 AI 聊天頁面 (`/chat`)

與 AI 助手對話，體驗 Streamdown 在即時串流場景中的渲染能力：

- 即時渲染 AI 回應
- 支援不完整 Markdown 的優雅處理
- 整合 Vercel AI SDK

### 📚 技術文件頁面 (`/docs`)

查看完整的微服務架構技術文件範例：

- 系統架構圖
- 流程圖和時序圖
- 狀態機設計
- 資料模型 ERD
- 完整的技術說明

### ✏️ Markdown 編輯器 (`/editor`)

即時編輯和預覽 Markdown：

- 分屏設計（左編輯，右預覽）
- 支援所有進階功能
- 即時渲染

## 技術堆疊

- **框架**: Next.js 15.5.4 (App Router + Turbopack)
- **UI 函式庫**: React 19.1.0
- **樣式**: Tailwind CSS 4
- **Markdown 渲染**: Streamdown
- **AI 整合**: Vercel AI SDK
- **語言**: TypeScript 5

## 快速開始

### 1. 安裝依賴

\`\`\`bash
npm install
\`\`\`

### 2. 環境變數設定

如果要使用 AI 聊天功能，需要設定 OpenAI API Key：

\`\`\`bash

# 複製環境變數範本

cp .env.local.example .env.local

# 編輯 .env.local，填入你的 OpenAI API Key

OPENAI_API_KEY=your_api_key_here
\`\`\`

### 3. 啟動開發伺服器

\`\`\`bash
npm run dev
\`\`\`

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

## 專案結構

\`\`\`
src/
├── app/
│ ├── api/
│ │ └── chat/
│ │ └── route.ts # AI 聊天 API
│ ├── chat/
│ │ └── page.tsx # 聊天頁面
│ ├── demo/
│ │ └── page.tsx # 功能展示頁面
│ ├── docs/
│ │ └── page.tsx # 技術文件頁面
│ ├── editor/
│ │ └── page.tsx # Markdown 編輯器
│ ├── globals.css # 全域樣式
│ ├── layout.tsx # 根佈局
│ └── page.tsx # 首頁
└── ...
\`\`\`

## Streamdown 核心功能

### 基本使用

\`\`\`typescript
import { Streamdown } from 'streamdown';

export default function Page() {
return (
<Streamdown
parseIncompleteMarkdown={true}
allowedImagePrefixes={['https://']}
allowedLinkPrefixes={['https://', 'mailto:']} >
{markdownContent}
</Streamdown>
);
}
\`\`\`

### 重要配置

#### 1. Tailwind CSS 配置

在 \`src/app/globals.css\` 中必須添加：

\`\`\`css
@source '../node_modules/streamdown/dist/index.js';
\`\`\`

#### 2. 安全配置

\`\`\`typescript
<Streamdown
allowedImagePrefixes={['https://trusted-cdn.com']}
allowedLinkPrefixes={['https://', 'mailto:']}

> {content}
> </Streamdown>
> \`\`\`

#### 3. Mermaid 主題配置

\`\`\`typescript
import type { MermaidConfig } from 'mermaid';

const mermaidConfig: MermaidConfig = {
theme: 'dark',
themeVariables: {
primaryColor: '#4f46e5',
// ...
},
};

<Streamdown mermaidConfig={mermaidConfig}>
  {content}
</Streamdown>
\`\`\`

## 開發指令

\`\`\`bash
npm run dev # 啟動開發伺服器
npm run build # 建置生產版本
npm start # 啟動生產伺服器
npm run lint # 執行 ESLint
npm run lint:fix # 自動修復 ESLint 問題
npm run format # 格式化程式碼
npm run format:check # 檢查程式碼格式
\`\`\`

## 學習資源

- [Streamdown 官方文件](https://streamdown.ai/)
- [Vercel AI SDK](https://ai-sdk.dev/)
- [Next.js 文件](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shiki 主題](https://shiki.style/themes)
- [Mermaid 文件](https://mermaid.js.org/)

## 授權

MIT
