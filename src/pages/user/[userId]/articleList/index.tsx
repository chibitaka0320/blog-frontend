import Image from "next/image";
import { Article, UserArticle } from "@/types";
import Layout from "../../../../../components/layout/Layout";
import MyArticleItem from "../../../../../components/myArticleItem/MyArticleItem";
import styles from "@/styles/UserArticles.module.css";
// import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function UserArticles() {
  const router = useRouter();
  const [articles, setArticles] = useState<UserArticle>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchArticles() {
      const { userId } = router.query;
      // const authToken = Cookies.get("authToken");
      const res = await fetch(
        `http://localhost:8080/users/${userId}/articles`,
        {
          cache: "no-store",
          // headers: {
          //   "X-AUTH-TOKEN": `Bearer ${authToken}`,
          // },
          // credentials: "include",
        }
      );
      if (!res.ok) {
        location.href = "/";
      } else {
        const data = await res.json();
        setArticles(data);
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, [router.query]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className={styles.contaienr}>
        <div className={styles.userHeader}>
          <div className={styles.headerLeft}>
            <Image
              src="/icon.png"
              alt=""
              width={100}
              height={100}
              className={styles.icon}
            />
          </div>
          <div className={styles.headerRight}>
            <p className={styles.userName}>{articles?.userName}</p>
            {articles?.introduction == null ? (
              <p>自己紹介が未記入です</p>
            ) : (
              <p>{articles?.introduction}</p>
            )}
          </div>
        </div>
        <div className={styles.title}>マイ記事</div>
        {articles?.articleList.map((article: Article) => {
          return <MyArticleItem key={article.articleId} article={article} />;
        })}
      </div>
    </Layout>
  );
}
