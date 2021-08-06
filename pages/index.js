import Head from "next/head";
import fire from "../config/firebaseConfig";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Home() {
  const [blogs, setBlogs] = useState([]);
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
    </div>
  );
}
