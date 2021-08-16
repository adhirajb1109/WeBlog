import React from "react";
import Head from "next/head";
import { useState } from "react";
import fire from "../../config/firebaseConfig";
import { useRouter } from "next/router";
function Register() {
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
    fire
      .auth()
      .createUserWithEmailAndPassword(userName, password)
      .catch((err) => {
        console.log(err.code, err.message);
      });
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>WeBlog | Register</title>
      </Head>
      <div className="container">
        <h1>Register</h1>
        <form className="mt-3" onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email Address :
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={userName}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password :
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm Password :
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              value={passConf}
              onChange={({ target }) => setPassConf(target.value)}
            />
          </div>
          <button type="submit" className="btn btn-outline-dark">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
