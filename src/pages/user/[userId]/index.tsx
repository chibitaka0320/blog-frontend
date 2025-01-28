import Image from "next/image";
import { User } from "@/types";
import Layout from "../../../../components/layout/Layout";
import styles from "@/styles/UserProfile.module.css";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function UserProfile() {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [introduction, setIntro] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      return alert("ファイルを選択してください");
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/s3/put-url?fileName=${file.name}&contentType=${file.type}`
      );
      const data = await response.json();
      const { url } = data;

      if (response.ok) {
        const uploadResponse = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (uploadResponse.ok) {
          const authToken = Cookies.get("authToken");
          const { userId } = router.query;
          const res = await fetch(`http://localhost:8080/users/${userId}`, {
            method: "PUT",
            headers: {
              "X-AUTH-TOKEN": `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              introduction,
              fileName: file.name,
            }),
          });

          if (res.ok) {
            location.href = `/user/${userId}`;
          } else {
            location.href = "/";
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchArticles() {
      const { userId } = router.query;
      const authToken = Cookies.get("authToken");
      const res = await fetch(`http://localhost:8080/users/${userId}`, {
        cache: "no-store",
        headers: {
          "X-AUTH-TOKEN": `Bearer ${authToken}`,
        },
        credentials: "include",
      });
      if (!res.ok) {
        location.href = "/";
      } else {
        const data: User = await res.json();
        setName(data.name);
        setIntro(data.introduction);
        setImageUrl(data.imageUrl);
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
        <div className={styles.title}>プロフィール編集</div>
        <div className={styles.userContainer}>
          <div className={styles.left}>
            <Image
              src={imageUrl ? imageUrl : "/icon.png"}
              alt=""
              width={100}
              height={100}
              className={styles.icon}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.fileInput}
              ref={fileInputRef}
            />
            <button className={styles.btFile} onClick={handleButtonClick}>
              画像を変更
            </button>
          </div>
          <div className={styles.right}>
            <form onSubmit={onSubmit} method="POST">
              <div className={styles.item}>
                <p className={styles.itemTitle}>表示名</p>
                <input
                  type="text"
                  value={name}
                  className={styles.input}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.item}>
                <p className={styles.itemTitle}>自己紹介</p>
                <textarea
                  value={introduction}
                  className={styles.textarea}
                  onChange={(e) => setIntro(e.target.value)}
                ></textarea>
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.button}>更新</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
