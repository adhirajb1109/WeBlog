import fire from "../../config/firebaseConfig";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
function Blog(props) {
  const router = useRouter();
  function handleDelete() {
    fire.firestore().collection("blogs").doc(props.id).delete();
    router.push("/");
  }
  const [loggedIn, setLoggedIn] = useState(false);
  const [uid, setUid] = useState(null);
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUid(user.uid);
      } else {
        setLoggedIn(false);
        setUid(null);
      }
    });
  }, []);

  return (
    <div className="container">
      <Head>
        <title>WeBlog | {props.title}</title>
      </Head>
      <h1 className="mb-3">{props.title}</h1>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-text lh-lg">{props.content}</h5>
        </div>
      </div>
      {props.author !== uid && !loggedIn ? null : (
        <>
          <Link href={`/blog/edit/${props.id}`}>
            <a className="btn btn-outline-info me-3 mb-3">
              Edit <i className="fas fa-edit ms-2"></i>
            </a>
          </Link>
          <button
            className="btn btn-outline-danger me-3 mb-3"
            onClick={handleDelete}
          >
            Delete
            <i className="far fa-trash-alt ms-2"></i>
          </button>
        </>
      )}
      <Link href="/">
        <a className="btn btn-outline-dark mb-3">
          Back <i className="fas fa-arrow-circle-left ms-2"></i>
        </a>
      </Link>
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
export default Blog;
