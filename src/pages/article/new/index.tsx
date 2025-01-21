import { useEffect, useState } from "react";
import Layout from "../../../../components/layout/Layout";
import styles from "@/styles/New.module.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AuthToken } from "@/types";
import { marked } from "marked";

export default function New() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [activeTab, setActiveTab] = useState("editor");

  useEffect(() => {
    const renderHtml = async () => {
      const html = await marked(content);
      setHtmlContent(html);
    };

    renderHtml();
  }, [content]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const auth = Cookies.get("authToken");
    if (auth) {
      const decode = jwtDecode<AuthToken>(auth);
      fetch("http://localhost:8080/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: decode.id,
          title,
          content,
        }),
      }).then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        location.href = "/";
      });
    } else {
      location.href = "/";
    }
  };

  return (
    <Layout>
      <form action="" onSubmit={onSubmit} method="POST">
        <div className={styles.container}>
          <div className={styles.parts}>
            <label htmlFor="title" className={styles.label}>
              TITLE
            </label>
            <span className={styles.error}></span>
            <br />
            <input
              type="text"
              id="title"
              placeholder="タイトル"
              className={styles.textbox}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.parts}>
            <label htmlFor="content" className={styles.label}>
              CONTENT
            </label>
            <span className={styles.error}></span>
            <br />
            <div className={styles.tabs}>
              <button
                type="button"
                className={activeTab === "editor" ? styles.activeTab : ""}
                onClick={() => setActiveTab("editor")}
              >
                Markdown
              </button>
              <button
                type="button"
                className={activeTab === "preview" ? styles.activeTab : ""}
                onClick={() => setActiveTab("preview")}
              >
                Preview
              </button>
            </div>

            {activeTab === "editor" ? (
              <textarea
                id="content"
                placeholder="本文"
                className={`${styles.textbox} ${styles.textarea}`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            ) : (
              <div
                className={`markdown-body ${styles.textbox} ${styles.previewHtml}`}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              ></div>
            )}
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              投稿する
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
