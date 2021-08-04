import { useState } from "react";
import fire from "../../config/firebaseConfig";
import { useRouter } from "next/router";
import Head from "next/head";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(username, password);
    setUsername("");
    setPassword("");
    router.push("/");
  };
  return (
    <div className="container">
      <Head>
        <title>WeBlog | Login</title>
      </Head>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <p className="form-label">Email :</p>
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          className="form-control mb-2"
        />
        <p className="form-label">Password :</p>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          className="form-control"
        />
        <br />
        <button type="submit" className="btn btn-dark ">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
