import React, { useState } from "react";
import fire from "../../config/firebaseConfig";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [uid, setUid] = useState(null);
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
      setUid(user.uid);
    } else {
      setLoggedIn(false);
      setUid(null);
    }
  });
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    fire.firestore().collection("blogs").add({
      title: title,
      content: content,
      author: uid,
    });
    setTitle("");
    setContent("");
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>WeBlog | Add Blog</title>
      </Head>
      <div className="container">
        <h2 className="mt-3">Add Blog</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <p className="form-label">Title :</p>
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              className="form-control my-2"
            />
          </div>
          <div>
            <p className="form-label">Content :</p>
            <textarea
              value={content}
              onChange={({ target }) => setContent(target.value)}
              className="form-control"
              rows="7"
            />
          </div>
          <button type="submit" className="btn btn-outline-dark my-3">
            Save
            <i className="far fa-save ms-2"></i>
          </button>
        </form>
      </div>
    </>
  );
};
export default CreatePost;
