import fire from "../../../config/firebaseConfig";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
function Edit(props) {
  const router = useRouter();
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [uid, setUid] = useState(null);
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);
    } else {
      setUid(null);
    }
  });

  const handleEdit = (e) => {
    e.preventDefault();
    fire
      .firestore()
      .collection("blogs")
      .doc(props.id)
      .update({
        title,
        content,
      })
      .then(() => {
        router.push("/");
        setTitle("");
        setContent("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <Head>
        <title>WeBlog | {props.title}</title>
      </Head>
      <h2 className="mt-3">Edit Blog</h2>
      <form onSubmit={handleEdit}>
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
        <button type="submit" className="btn btn-outline-dark my-3">
          Save
          <i className="far fa-save ms-2"></i>
        </button>
      </form>
    </div>
  );
}
export const getServerSideProps = async ({ query }) => {
  const content = {};
  await fire
    .firestore()
    .collection("blogs")
    .doc(query.id)
    .get()
    .then((result) => {
      content["title"] = result.data().title;
      content["content"] = result.data().content;
      content["author"] = result.data().author;
    });
  return {
    props: {
      id: query.id,
      title: content.title,
      content: content.content,
      author: content.author,
    },
  };
};
export default Edit;
