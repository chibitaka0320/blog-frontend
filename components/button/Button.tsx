import styles from "./button.module.css";

export default function Button({ name }: { name: string }) {
  return <button className={styles.button}>{name}</button>;
}
