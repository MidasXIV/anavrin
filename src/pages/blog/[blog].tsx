import BlogLayout from "../../layouts/blog";
import WebsiteLayout from "../../layouts/website";
import { getRequestedBlog } from "../../lib/blog-utils";
import { getAllBlogs } from "../../lib/blog-utils-client";

export default function BlogPost({ blog }) {
  const { content, title } = blog;

  if (!content) return <></>;
  console.log(title);
  return (
    <WebsiteLayout title={title}>
      <BlogLayout title={title} blog={blog} />
    </WebsiteLayout>
  );
}

export async function getStaticPaths() {
  /**
   * If a page has dynamic routes (documentation) and uses getStaticProps
   * it needs to define a list of paths that have to be rendered to
   * HTML at build time.
   *
   * # https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
   *
   * If you export an async function called getStaticPaths from a page
   * that uses dynamic routes, Next.js will statically pre-render all
   * the paths specified by getStaticPaths.
   */

  /** param: {key: ..} the key should be the name of file [blog] hence blog */
  const paths = getAllBlogs().map(blog => ({
    params: {
      blog: blog.slug
    }
  }));
  return {
    paths,
    fallback: false
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  /**
   * params contains the `blog` key passed in path of getStaticPaths.
   * If the route is like /blog/first-post, then params.blog is first-post
   */
  const slug = params.blog;
  const blogData = await getRequestedBlog(slug);

  // Pass blog data to the page via props
  // blogData overwrites the blog title
  return { props: { blog: { slug, ...blogData } } };
}
