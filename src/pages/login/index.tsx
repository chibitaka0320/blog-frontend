import { useState } from "react";
import Cookies from "js-cookie";
import Layout from "../../../components/layout/Layout";
import styles from "@/styles/Login.module.css";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError] = useState("");
  const [passwordError] = useState("");
  const [authError, setAuthError] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setAuthError("ユーザー名またはパスワードが違います");
          throw new Error();
        }
        const allCookies = document.cookie;
        console.log(allCookies);
        const authToken = response.headers.get("X-AUTH-TOKEN");
        if (!authToken) {
          setAuthError("ユーザー名またはパスワードが違います");
          throw new Error();
        }
        Cookies.set("authToken", authToken, { expires: 1 });
        location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <main>
        <form action="" onSubmit={onSubmit} method="POST">
          <div className={styles.loginContainer}>
            <div className={styles.loginHeader}>
              <p>
                <strong> ラクスブログ </strong>にログイン
              </p>
            </div>
            <div className={styles.loginContent}>
              <p className={styles.authError}>{authError}</p>
              <div className={styles.parts}>
                <label htmlFor="email" className={styles.label}>
                  メールアドレス
                </label>
                <span className={styles.error}>{emailError}</span>
                <br />
                <input
                  type="email"
                  id="email"
                  placeholder="example@example.com"
                  className={styles.textbox}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.parts}>
                <label htmlFor="password" className={styles.label}>
                  パスワード
                </label>
                <span className={styles.error}>{passwordError}</span>
                <br />
                <input
                  type="password"
                  id="password"
                  placeholder="8~16文字"
                  className={styles.textbox}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button type="reset" className={styles.button}>
                  リセット
                </button>
                <button className={styles.button}>ログイン</button>
              </div>
            </div>
          </div>
        </form>
        <Link href={"/register"} className={styles.signUp}>
          <p>アカウントをお持ちでない方</p>
        </Link>
      </main>
    </Layout>
  );
}
