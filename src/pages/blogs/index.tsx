import Link from "next/link";
import { FC } from "react";
import WebsiteLayout from "../../layouts/website";
import { getAllBlogs } from "../../lib/blog-utils-client";

const BlogHeader: FC<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <div className="border-b bg-white pb-5 pt-6 sm:pb-10">
    <div className="container mx-auto max-w-4xl px-4 text-center">
      {/* <h1 className="mb-1 text-3xl font-bold sm:mb-2 sm:text-5xl">{title}</h1> */}

      <h2 className="text-rep outline-font mx-auto flex flex-col py-4 font-wide text-[60px] md:text-[85px] lg:text-[108px]">
        <span className="relative bg-white leading-none">{title}</span>
      </h2>

      <p className="text-sm text-gray-500 sm:text-lg">{description}</p>
    </div>
  </div>
);
const BlogListItem: FC<{
  blog: Blog;
  key: string;
}> = ({ blog, key }) => {
  const { slug, title, description, author, updatedAt } = blog;
  const formattedDate = new Date(updatedAt).toDateString();
  return (
    <Link href={{ pathname: `/blogs/${slug}` }}>
      <a
        className="text-md group flex items-center justify-between border-b py-2 text-gray-600 no-underline hover:text-blue-600"
        href={`/blogs/${slug}`}
        key={key}
      >
        <span className="transition-transform group-hover:translate-x-2">{title}</span>

        <span className="hidden text-xs capitalize text-gray-500 sm:block">{author}</span>

        <span className="block text-xs text-gray-400 sm:hidden"> &raquo;</span>
      </a>
    </Link>
  );
};
const BlogListCard: FC<{
  blog: Blog;
  key: string;
}> = ({ blog, key }) => {
  const { slug, title, description, author, updatedAt } = blog;
  const formattedDate = new Date(updatedAt).toDateString();
  return (
    <Link href={{ pathname: `/blogs/${slug}` }}>
      <a
        className="group relative mt-2 block overflow-hidden rounded-lg border border-slate-100 bg-white p-2"
        href={`/blogs/${slug}`}
        key={key}
      >
        <div className="flex justify-between">
          <div className="pl-2 group-hover:translate-x-2">
            <h5 className="text-md font-bold text-slate-900">{title}</h5>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>

          <div className="flex min-w-max flex-row space-x-4 sm:ml-3">
            <dl className="hidden sm:flex">
              <div className="my-auto flex flex-col-reverse">
                <dt className="text-sm font-medium text-slate-600">Published</dt>
                <dd className="text-xs text-slate-500">{formattedDate}</dd>
              </div>

              <div className="my-auto ml-6 flex flex-col-reverse">
                <dt className="text-sm font-medium text-slate-600">Author</dt>
                <dd className="text-xs text-slate-500">{author}</dd>
              </div>
            </dl>
            <img
              className="h-16 w-16 rounded-lg object-cover shadow-sm"
              src="https://github.com/creativetimofficial/argon-design-system/blob/master/assets/img/faces/team-2.jpg?raw=true"
              alt=""
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

const Blog = () => {
  const blogs = getAllBlogs();

  return (
    <>
      <WebsiteLayout title="Simulator">
        <div className="flex-grow bg-gray-50 pb-20 pt-2">
          <BlogHeader
            title="Blogs"
            description="Exploring Airdrops and Stock Analysis: Unveiling Insights and Opportunities"
          />
          <div className="container mx-auto max-w-4xl px-4">
            {/* {blogs.map(blog => (
              <BlogListItem blog={blog} key={blog.slug} />
            ))} */}
            {blogs.map(blog => (
              <BlogListCard blog={blog} key={blog.slug} />
            ))}
          </div>
        </div>
      </WebsiteLayout>
    </>
  );
};
export default Blog;
