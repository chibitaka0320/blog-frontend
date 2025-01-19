import Image from "next/image";
import Cookies from "js-cookie";
import style from "./header.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthToken } from "@/types";
import Button from "../button/Button";

export default function Header() {
  const [authToken, setAuthToken] = useState<string>();
  const [name, setName] = useState<string>();
  const [isMenu, setIsMenu] = useState<boolean>(false);

  useEffect(() => {
    const auth = Cookies.get("authToken");

    if (auth) {
      const decode = jwtDecode<AuthToken>(auth);
      setAuthToken(auth);
      setName(decode.name);
    }
  }, []);

  const logout = () => {
    Cookies.remove("authToken");
    setAuthToken("");
    setName("");

    location.href = "/";
  };

  const onMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <div className={style.container}>
      <header className={style.header}>
        <div>
          <Link href={"/"}>
            <Image src="/logo.jpeg" alt="" width={100} height={50}></Image>
          </Link>
        </div>
        <div>
          <ul className={style.headerMenu}>
            {authToken ? (
              <>
                <li>{name}</li>
                <li className={`${style.iconParent} ${style.icon}`}>
                  <button onClick={onMenu}>
                    <Image src="/icon.png" alt="" width={40} height={40} />
                  </button>
                  {isMenu && (
                    <ul className={style.iconChild}>
                      <li>{name}</li>
                      <Link href={`/user/articleList`}>
                        <li>マイ投稿</li>
                      </Link>
                      <li>
                        <button onClick={logout}>ログアウト</button>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link href={"/article/new"}>
                    <Button name="新規投稿" />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href={"/login"}>
                    <button>ログイン</button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}
