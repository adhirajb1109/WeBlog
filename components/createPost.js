import React, { useState } from "react";
import fire from "../config/firebaseConfig";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    fire.firestore().collection("blogs").add({
      title: title,
      content: content,
    });
    setNotification("Blogpost created");
    setTimeout(() => {
      setNotification("");
    }, 2000);
    setTitle("");
    setContent("");
  };
  return (
    <div>
      <h2 className="mt-3">Add Blog</h2>
      {notification}
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
