import * as path from "path";
import BlogLayout from "../../../layouts/blog";
import WebsiteLayout from "../../../layouts/website";
import { getRequestedLearnContent } from "../../../lib/blog-utils";
import { getAllBlogsInLearnContent } from "../../../lib/blog-utils-client";

export default function BlogPost({ blog }) {
  const { content, title } = blog;

  if (!content) return <></>;
  return (
    <WebsiteLayout title={title}>
      <BlogLayout title={title} blog={blog} />
    </WebsiteLayout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllBlogsInLearnContent().map(blog => ({
    params: {
      blog: blog.slug,
      category: blog.url.split("/")[1]
    }
  })); // Fetch all blog paths in each category

  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  /**
   * params contains the `blog` key passed in path of getStaticPaths.
   * If the route is like /blog/first-post, then params.blog is first-post
   */
  const { category, blog } = params;
  const slug = path.join(category, blog);

  const blogData = await getRequestedLearnContent(category, blog);

  // Pass blog data to the page via props
  // blogData overwrites the blog title
  return { props: { blog: { slug, ...blogData } } };
}
