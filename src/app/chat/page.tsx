'use client';

import { useChat } from '@ai-sdk/react';
import { Streamdown } from 'streamdown';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b bg-white p-4 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold">AI 聊天助手</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">使用 Streamdown 渲染的 AI 對話介面</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl p-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <h2 className="mb-2 text-xl font-semibold text-gray-600 dark:text-gray-400">開始對話</h2>
                <p className="text-sm text-gray-500 dark:text-gray-500">輸入訊息與 AI 助手對話</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-lg p-4 ${
                      message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white shadow-md dark:bg-gray-900'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    ) : (
                      <Streamdown
                        parseIncompleteMarkdown={true}
                        allowedImagePrefixes={['https://']}
                        allowedLinkPrefixes={['https://', 'http://localhost', 'mailto:']}
                        controls={{
                          code: true,
                          table: true,
                          mermaid: true,
                        }}
                      >
                        {message.content}
                      </Streamdown>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-lg bg-white p-4 shadow-md dark:bg-gray-900">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-white p-4 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="輸入訊息..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700"
            >
              {isLoading ? '傳送中...' : '傳送'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
