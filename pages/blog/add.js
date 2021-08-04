import React, { useState } from "react";
import fire from "../../config/firebaseConfig";
import { useRouter } from "next/router";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const user = fire.auth().currentUser;
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  if (!user) {
    router.push("/");
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    fire.firestore().collection("blogs").add({
      title: title,
      content: content,
    });
    setTitle("");
    setContent("");
    router.push("/");
  };
  return (
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
          />
        </div>
        <button type="submit" className="btn btn-dark my-3">
          Save
        </button>
      </form>
    </div>
  );
};
export default CreatePost;
