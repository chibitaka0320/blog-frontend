import Image from "next/image";
import { Article, AuthToken, Comment } from "@/types";
import Layout from "../../../components/layout/Layout";
import styles from "@/styles/Article.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Comments from "../../../components/comment/Comments";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

interface Props {
  params: {
    articleId: string;
  };
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:8080/api/articles");
  const articles = await res.json();

  const paths = articles.map((article: Article) => ({
    params: { articleId: article.articleId.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: Props) {
  const res = await fetch(
    `http://localhost:8080/api/articles/${params.articleId}`
  );
  if (!res.ok) {
    return {
      notFound: true,
    };
  }
  const article = await res.json();
  return {
    props: { article },
  };
}

export default function Articles({ article }: { article: Article }) {
  const [comment, setComment] = useState("");
  const {
    articleId,
    userName,
    title,
    createdAt,
    updatedAt,
    content,
    commentList,
  } = article;
  const createdAtDate = new Date(createdAt);
  const createdFormat =
    createdAtDate.getFullYear() +
    "年" +
    (createdAtDate.getMonth() + 1) +
    "月" +
    createdAtDate.getDate() +
    "日";

  const updatedAtDate = new Date(updatedAt);
  const updatedFormat =
    updatedAtDate.getFullYear() +
    "年" +
    (updatedAtDate.getMonth() + 1) +
    "月" +
    updatedAtDate.getDate() +
    "日";

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const auth = Cookies.get("authToken");
    if (auth) {
      const decode = jwtDecode<AuthToken>(auth);
      fetch(`http://localhost:8080/api/articles/${articleId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleId: articleId,
          userId: decode.id,
          content: comment,
        }),
      }).then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        location.href = `/article/${articleId}`;
      });
    } else {
      location.href = "/login";
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.titleHeader}>
            <Image
              src="/icon.png"
              alt=""
              width={40}
              height={40}
              className={styles.icon}
            />
            <span className={styles.username}>{userName}</span>
          </div>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.titleFooter}>
            <div className={styles.dateItem}>
              <span className={styles.dateTitle}>最終更新日</span>
              <span className={styles.date}>{createdFormat}</span>
            </div>
            <div className={styles.dateItem}>
              <span className={styles.dateTitle}>作成日</span>
              <span className={styles.date}>{updatedFormat}</span>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <pre>{content}</pre>
          {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown> */}
        </div>
        <div className={styles.content}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
        <div className={styles.commentContainer}>
          <div className={styles.commentHeader}>
            <p>コメント</p>
          </div>
          {commentList.length == 0 ? (
            <div className={styles.noComment}>
              <pre>この記事にコメントはありません</pre>
            </div>
          ) : (
            <>
              {commentList.map((comment: Comment) => {
                return <Comments key={comment.commentId} props={comment} />;
              })}
            </>
          )}
          <form
            action=""
            onSubmit={onSubmit}
            method="POST"
            className={styles.commentForm}
          >
            <p>コメントする</p>
            <textarea
              placeholder="コメント"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className={styles.buttonContainer}>
              <button className={styles.button}>投稿する</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
