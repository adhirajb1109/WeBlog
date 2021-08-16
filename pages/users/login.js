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
    fire
      .auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {
        console.log(err.code, err.message);
      });
    setUsername("");
    setPassword("");
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>WeBlog | Login</title>
      </Head>
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label className="form-label mt-3">Email Address :</label>
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            className="form-control mb-3"
          />
          <label className="form-label">Password :</label>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className="form-control mb-3"
          />
          <button type="submit" className="btn btn-outline-dark">
            Login
            <i className="fas fa-sign-in-alt ms-2"></i>
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
