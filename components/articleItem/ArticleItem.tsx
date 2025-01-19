import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./articleItem.module.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Article } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ArticleItem({ article }: { article: Article }) {
  const router = useRouter();
  const { userId, userName, title, createdAt, articleId } = article;
  const createdAtDate = new Date(createdAt);
  const createdFormat =
    createdAtDate.getFullYear() +
    "年" +
    (createdAtDate.getMonth() + 1) +
    "月" +
    createdAtDate.getDate() +
    "日";

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a") === null) {
      router.push(`/article/${articleId}`);
    }
  };

  return (
    <div className={styles.itemContainer}>
      <button onClick={handleClick} className={styles.linkButton}>
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
            <Link href={`user/${userId}/articleList`} className={styles.link}>
              <p className={styles.name}>{userName}</p>
            </Link>
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
      </button>
    </div>
  );
}
