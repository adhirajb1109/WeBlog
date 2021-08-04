import { useState } from "react";
import fire from "../../config/firebaseConfig";
import { useRouter } from "next/router";
import Head from "next/head";
const Register = () => {
  const router = useRouter();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== passConf) {
      setPassword("");
      setPassConf("");
      return null;
    }
    fire.auth().createUserWithEmailAndPassword(userName, password);
    router.push("/");
  };
  return (
    <div className="container">
      <Head>
        <title>WeBlog | Register</title>
      </Head>
      <h1>Register</h1>
      {notification}
      <form onSubmit={handleLogin}>
        <p className="form-label">Email :</p>
        <input
          type="text"
          value={userName}
          onChange={({ target }) => setUsername(target.value)}
          className="form-control my-2"
        />
        <p className="form-label">Password :</p>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          className="form-control my-2"
        />
        <p className="form-label">Confirm Password :</p>
        <input
          type="password"
          value={passConf}
          onChange={({ target }) => setPassConf(target.value)}
          className="form-control my-2"
        />
        <br />
        <button type="submit" className="btn btn-dark">
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
