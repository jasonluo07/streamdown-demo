'use client';

import { useState } from 'react';
import { Streamdown } from 'streamdown';

const defaultContent = `# Markdown 編輯器

在左側編輯 Markdown，右側即時預覽！

## 支援的功能

### 基本語法
- **粗體** 和 *斜體*
- \`行內程式碼\`
- [連結](https://example.com)

### 程式碼區塊

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

### 表格

| 功能 | 狀態 |
|------|------|
| 語法高亮 | ✅ |
| 即時預覽 | ✅ |

### 數學公式

行內公式：$E = mc^2$

區塊公式：

$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$

### Mermaid 圖表

\`\`\`mermaid
graph LR
    A[開始] --> B[編輯]
    B --> C[預覽]
    C --> D[完成]
\`\`\`
`;

export default function EditorPage() {
  const [content, setContent] = useState(defaultContent);

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b bg-white p-4 dark:bg-gray-900">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Markdown 編輯器</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">即時預覽的 Markdown 編輯器</p>
        </div>
      </div>

      {/* Editor + Preview */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor */}
        <div className="flex w-1/2 flex-col border-r">
          <div className="border-b bg-gray-100 px-4 py-2 text-sm font-medium dark:bg-gray-800">編輯區</div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 resize-none p-4 font-mono text-sm focus:outline-none dark:bg-gray-900 dark:text-gray-100"
            placeholder="在此輸入 Markdown..."
          />
        </div>

        {/* Preview */}
        <div className="flex w-1/2 flex-col overflow-hidden">
          <div className="border-b bg-gray-100 px-4 py-2 text-sm font-medium dark:bg-gray-800">預覽區</div>
          <div className="flex-1 overflow-y-auto bg-white p-4 dark:bg-gray-900">
            <Streamdown
              parseIncompleteMarkdown={true}
              allowedImagePrefixes={['https://', 'http://localhost']}
              allowedLinkPrefixes={['https://', 'http://localhost', 'mailto:']}
              controls={{
                code: true,
                table: true,
                mermaid: true,
              }}
            >
              {content}
            </Streamdown>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-gray-100 px-4 py-2 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400">
        <div className="container mx-auto flex items-center justify-between">
          <span>{content.length} 個字元</span>
          <span>支援 GFM、程式碼高亮、LaTeX、Mermaid</span>
        </div>
      </div>
    </div>
  );
}
