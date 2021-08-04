import { useState } from "react";
import fire from "../../config/firebaseConfig";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
const Register = () => {
  const router = useRouter();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");
  const [notification, setNotification] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== passConf) {
      setNotification("Password and password confirmation does not match");
      setTimeout(() => {
        setNotification("");
      }, 2000);
      setPassword("");
      setPassConf("");
      return null;
    }
    fire.auth().createUserWithEmailAndPassword(userName, password);
    router.push("/");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>WeBlog | Register</title>
      </Head>
      <h1>Create new user</h1>
      {notification}
      <form onSubmit={handleLogin}>
        Email :
        <br />
        <input
          type="text"
          value={userName}
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
        Confirm Password :
        <br />
        <input
          type="password"
          value={passConf}
          onChange={({ target }) => setPassConf(target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default Register;
