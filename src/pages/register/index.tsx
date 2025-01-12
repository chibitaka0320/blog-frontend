import { useState } from "react";
import Layout from "../../../components/layout/Layout";
import styles from "@/styles/Register.module.css";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError] = useState("");
  const [confirmPasswordError] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status == 400) {
            return response.text();
          }
          throw new Error();
        }
        const authToken = response.headers.get("X-AUTH-TOKEN");
        if (!authToken) {
          throw new Error();
        }
        Cookies.set("authToken", authToken, { expires: 1 });
        location.href = "/";
      })
      .then((data) => {
        if (data) {
          setEmailError(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <main>
        <form action="" onSubmit={onSubmit}>
          <div className={styles.registerContainer}>
            <div className={styles.registerHeader}>
              <p>
                <strong> ラクスブログ </strong>に登録
              </p>
            </div>
            <div className={styles.registerContent}>
              <div className={styles.parts}>
                <label htmlFor="name" className={styles.label}>
                  名前
                </label>
                <span className={styles.error}>{nameError}</span>
                <br />
                <input
                  type="text"
                  id="name"
                  placeholder="ユーザー名"
                  className={styles.textbox}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
              <div className={styles.parts}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  確認用パスワード
                </label>
                <span className={styles.error}>{confirmPasswordError}</span>
                <br />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="8~16文字"
                  className={styles.textbox}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button type="reset" className={styles.button}>
                  リセット
                </button>
                <button className={styles.button}>登録</button>
              </div>
            </div>
          </div>
        </form>
        <Link href={"/login"} className={styles.signUp}>
          <p>すでにアカウントをお持ちの方</p>
        </Link>
      </main>
    </Layout>
  );
}
