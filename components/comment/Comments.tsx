import Image from "next/image";
import styles from "./comment.module.css";
import { Comment } from "@/types";

export default function Comments({ props }: { props: Comment }) {
  const { userName, createdAt, content } = props;
  const createdAtDate = new Date(createdAt);
  const createdFormat =
    createdAtDate.getFullYear() +
    "年" +
    (createdAtDate.getMonth() + 1) +
    "月" +
    createdAtDate.getDate() +
    "日";

  return (
    <div className={styles.commentContainer}>
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
        <pre className={styles.comment}>{content}</pre>
      </div>
    </div>
  );
}
