import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./articleItem.module.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Article } from "@/types";
import Link from "next/link";

export default function ArticleItem({ article }: { article: Article }) {
  const { userName, title, createdAt, articleId } = article;
  const createdAtDate = new Date(createdAt);
  const createdFormat =
    createdAtDate.getFullYear() +
    "年" +
    (createdAtDate.getMonth() + 1) +
    "月" +
    createdAtDate.getDate() +
    "日";
  return (
    <Link href={`/article/${articleId}`}>
      <div className={styles.itemContainer}>
        <div className={styles.itemHeader}>
          <div className={styles.headerLeft}>
            <Image
              src="/icon.png"
              alt=""
              width={70}
              height={70}
              className={styles.icon}
            />
          </div>
          <div className={styles.headerRight}>
            <p className={styles.name}>{userName}</p>
            <p className={styles.date}>{createdFormat}</p>
          </div>
        </div>
        <div className={styles.itemContent}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className={styles.itemFooter}>
          <FontAwesomeIcon icon={faHeart} />
          <span className={styles.count}>30</span>
        </div>
      </div>
    </Link>
  );
}
