import fire from "../../config/firebaseConfig";
import Link from "next/link";
import Head from "next/head";
function Blog(props) {
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
      <Link href="/">
        <a className="btn btn-dark mb-3">Back</a>
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
    });
  return {
    props: {
      title: content.title,
      content: content.content,
    },
  };
};
export default Blog;
