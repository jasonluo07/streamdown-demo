import { Streamdown } from 'streamdown';

const markdownContent = `# Streamdown 功能展示

## 基本語法測試

這是一段普通文字，包含 **粗體文字** 和 *斜體文字*，還有 ~~刪除線~~。

### 行內程式碼

使用 \`const greeting = "Hello World"\` 來宣告變數。

### 程式碼區塊

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}

const user = await fetchUser('123');
console.log(user.name);
\`\`\`

\`\`\`python
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# 計算第 10 個費波那契數
result = fibonacci(10)
print(f"第 10 個費波那契數是: {result}")
\`\`\`

## 列表測試

### 無序列表

- 第一項
- 第二項
  - 巢狀項目 2.1
  - 巢狀項目 2.2
- 第三項

### 有序列表

1. 首先做這個
2. 然後做那個
3. 最後完成這個

### 任務清單

- [x] 安裝 Streamdown
- [x] 配置 Tailwind CSS
- [ ] 實作 AI 聊天功能
- [ ] 部署到正式環境

## 表格

| 功能 | 支援度 | 說明 |
|------|--------|------|
| GitHub Flavored Markdown | ✅ | 完整支援 |
| 程式碼語法高亮 | ✅ | 使用 Shiki |
| LaTeX 數學公式 | ✅ | 支援行內和區塊公式 |
| Mermaid 圖表 | ✅ | 流程圖、時序圖等 |
| 安全防護 | ✅ | 防止 prompt injection |

## LaTeX 數學公式

### 行內公式

質能方程式 $E = mc^2$ 是物理學中最著名的公式之一。

圓的面積公式為 $A = \\pi r^2$，其中 $r$ 是半徑。

### 區塊公式

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

$$
\\frac{d}{dx} \\left( \\int_{a}^{x} f(t) dt \\right) = f(x)
$$

$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$

## Mermaid 圖表

### 流程圖

\`\`\`mermaid
graph TD
    A[開始] --> B{是否登入?}
    B -->|是| C[顯示儀表板]
    B -->|否| D[顯示登入頁面]
    D --> E[輸入帳號密碼]
    E --> F{驗證成功?}
    F -->|是| C
    F -->|否| D
    C --> G[結束]
\`\`\`

### 時序圖

\`\`\`mermaid
sequenceDiagram
    participant 使用者
    participant 前端
    participant API
    participant 資料庫

    使用者->>前端: 送出表單
    前端->>API: POST /api/users
    API->>資料庫: INSERT INTO users
    資料庫-->>API: 回傳結果
    API-->>前端: 200 OK
    前端-->>使用者: 顯示成功訊息
\`\`\`

### 類別圖

\`\`\`mermaid
classDiagram
    class User {
        +String id
        +String name
        +String email
        +login()
        +logout()
    }

    class Admin {
        +String[] permissions
        +manageUsers()
    }

    class Post {
        +String id
        +String title
        +String content
        +publish()
    }

    User <|-- Admin
    User "1" --> "*" Post : creates
\`\`\`

## 引用區塊

> 這是一段引用文字。
>
> 可以包含多段內容。
>
> > 也可以有巢狀引用。

## 連結與圖片

[Streamdown 官方文件](https://streamdown.ai/)

[Vercel AI SDK](https://ai-sdk.dev/)

## 水平分隔線

---

## 總結

Streamdown 是一個功能強大的 Markdown 渲染函式庫，特別適合用於：

1. AI 聊天應用
2. 技術文件展示
3. 即時內容預覽
4. 程式碼分享平台

它提供了優雅的串流處理、完整的安全防護，以及豐富的擴展功能。
`;

export default function DemoPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Streamdown 功能展示</h1>
        <p className="text-gray-600 dark:text-gray-400">這個頁面展示了 Streamdown 支援的各種 Markdown 功能</p>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-lg dark:bg-gray-900">
        <Streamdown
          parseIncompleteMarkdown={true}
          defaultOrigin="https://streamdown.ai"
          allowedImagePrefixes={['https://']}
          allowedLinkPrefixes={['https://', 'http://localhost', 'mailto:']}
          controls={{
            code: true,
            table: true,
            mermaid: true,
          }}
        >
          {markdownContent}
        </Streamdown>
      </div>
    </div>
  );
}
