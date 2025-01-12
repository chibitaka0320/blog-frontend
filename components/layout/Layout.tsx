import { ReactNode } from "react";
import Header from "../header/Header";
import styles from "./layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className={styles.mainContainer}>{children}</main>
    </div>
  );
}
