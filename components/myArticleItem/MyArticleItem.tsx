import { Article } from "@/types";
import styles from "./myArticleItem.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export default function MyArticleItem({ article }: { article: Article }) {
  const { title, createdAt, content, articleId } = article;
  const contentForm = content.replace(/\r?\n/g, " ");
  const createdAtDate = new Date(createdAt);
  const createdFormat =
    createdAtDate.getFullYear() +
    "年" +
    (createdAtDate.getMonth() + 1) +
    "月" +
    createdAtDate.getDate() +
    "日";

  return (
    <div className={styles.itemContainer}>
      <Link href={`/article/${articleId}`}>
        <div className={styles.itemDate}>{createdFormat}</div>
        <div className={styles.itemTitle}>{title}</div>
        <div className={styles.itemContent}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {contentForm}
          </ReactMarkdown>
        </div>
      </Link>
    </div>
  );
}
