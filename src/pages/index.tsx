import { Article } from "@/types";
import Layout from "../../components/layout/Layout";
import ArticleItem from "../../components/articleItem/ArticleItem";

export async function getStaticProps() {
  const res = await fetch("http://localhost:8080/api/articles", {
    cache: "no-store",
  });
  const articles = await res.json();

  return {
    props: {
      articles,
    },
  };
}

export default function Home({ articles }: { articles: Article[] }) {
  return (
    <div>
      <Layout>
        {articles.map((article: Article) => {
          return <ArticleItem key={article.articleId} article={article} />;
        })}
      </Layout>
    </div>
  );
}
