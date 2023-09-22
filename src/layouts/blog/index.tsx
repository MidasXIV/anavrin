import Head from "next/head";
import BlogContent from "./content";
import BlogHeader from "./header";

const BlogLayout = ({ title, blog }) => {
  const pagetTitle = `Anavrin | ${title}`;
  return (
    <>
      <Head>
        <title>{pagetTitle}</title>
      </Head>
      <div className="flex flex-1 flex-col">
        <BlogHeader blog={blog} />
        <BlogContent blog={blog} />
      </div>
    </>
  );
};
export default BlogLayout;
