import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4-turbo'),
    messages,
    system: `你是一個專業且友善的 AI 助手。你的回應應該：
1. 使用繁體中文回答
2. 當需要展示程式碼時，使用適當的語法高亮（如 typescript, python, javascript 等）
3. 當需要解釋複雜概念時，可以使用 Mermaid 圖表
4. 當涉及數學公式時，使用 LaTeX 語法
5. 保持回應簡潔明確，適時使用列表和表格來組織資訊`,
  });

  return result.toDataStreamResponse();
}
