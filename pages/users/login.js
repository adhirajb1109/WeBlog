import { useState } from "react";
import fire from "../../config/firebaseConfig";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotification] = useState("");
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {
        console.log(err.code, err.message);
        setNotification(err.message);
        setTimeout(() => {
          setNotification("");
        }, 2000);
      });
    setUsername("");
    setPassword("");
    router.push("/");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>WeBlog | Login</title>
      </Head>
      <h1>Login</h1>
      {notify}
      <form onSubmit={handleLogin}>
        Email :
        <br />
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        Password :
        <br />
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
