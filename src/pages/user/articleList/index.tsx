import { Article } from "@/types";
import Layout from "../../../../components/layout/Layout";
import MyArticleItem from "../../../../components/myArticleItem/MyArticleItem";
import styles from "@/styles/UserArticles.module.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function UserArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchArticles() {
      const authToken = Cookies.get("authToken");
      const res = await fetch("http://localhost:8080/users/articles", {
        cache: "no-store",
        headers: {
          "X-AUTH-TOKEN": `Bearer ${authToken}`,
        },
      });
      if (!res.ok) {
        location.href = "/";
      } else {
        const data = await res.json();
        console.log(data);
        setArticles(data);
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className={styles.contaienr}>
        <div className={styles.title}>マイ記事</div>
        {articles.map((article: Article) => {
          return <MyArticleItem key={article.articleId} article={article} />;
        })}
      </div>
    </Layout>
  );
}
