import Head from "next/head";
import CreatePost from "../components/createPost";
import fire from "../config/firebaseConfig";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [notification, setNotification] = useState("");
  const user = fire.auth().currentUser;
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  const handleLogout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        setNotification("Logged out");
        setTimeout(() => {
          setNotification("");
        }, 2000);
      });
  };
  useEffect(() => {
    fire
      .firestore()
      .collection("blogs")
      .onSnapshot((snap) => {
        const blogs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogs);
      });
  }, []);
  return (
    <div className="container">
      <Head>
        <title>WeBlog | Home</title>
      </Head>
      <h1>Feed</h1>
      <ul className="list-group mt-3">
        {blogs.map((blog) => (
          <li key={blog.id} className="list-group-item">
            <Link href="/blog/[id]" as={"/blog/" + blog.id}>
              <a className="text-decoration-none text-dark">{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      {loggedIn && <CreatePost />}
    </div>
  );
}
