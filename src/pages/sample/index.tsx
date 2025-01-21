import { useState, useEffect } from "react";
import { marked } from "marked";

export default function Home() {
  // Markdownの状態を管理するステート
  const [markdown, setMarkdown] = useState(`# Hello, Next.js!

This is a sample **Markdown** document.

- Item 1
- Item 2
- Item 3

\`\`\`javascript
console.log("Code block example");
\`\`\`

[Visit OpenAI](https://openai.com)`);

  // HTMLの状態を管理するステート
  const [htmlContent, setHtmlContent] = useState("");

  // MarkdownをHTMLに変換するuseEffect
  useEffect(() => {
    const convertMarkdownToHtml = async () => {
      const html = await marked(markdown); // markedは同期的に処理できます
      setHtmlContent(html); // HTMLに変換した結果をステートにセット
    };

    convertMarkdownToHtml();
  }, [markdown]); // markdownが変更されるたびに実行

  // テキストエリアの変更をハンドルする関数
  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* テキストエリア */}
      <textarea
        style={{
          width: "50%",
          height: "400px",
          padding: "10px",
          fontSize: "16px",
          fontFamily: "monospace",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#fdfcfb",
        }}
        value={markdown}
        onChange={handleMarkdownChange}
      />

      {/* プレビューエリア */}
      <div
        className="markdown-body"
        style={{
          width: "50%",
          height: "400px",
          overflowY: "auto",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#fdfcf3",
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
