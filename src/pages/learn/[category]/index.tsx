import Link from "next/link";
import { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import WebsiteLayout from "../../../layouts/website";
import {
  getAllBlogs,
  getAllBlogsWithinCategories,
  getCategories
} from "../../../lib/blog-utils-client";

export async function getStaticPaths() {
  const categories = await getCategories(); // Fetch available categories
  const paths = categories.map(category => ({
    params: { category: category.slug }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { category: categorySlug } = params;
  const category = getCategories().find(_category => _category.slug === categorySlug);
  const blogs = await getAllBlogsWithinCategories(categorySlug);

  return {
    props: { category, blogs }
  };
}

const BlogHeader: FC<{
  title: string;
  description: string;
  slug: string;
}> = ({ title, description, slug }) => (
  <div className="border-b bg-white pb-5 pt-6 sm:pb-10">
    <div className="container mx-auto max-w-4xl px-4 text-center">
      {/* <h1 className="mb-1 text-3xl font-bold sm:mb-2 sm:text-5xl">{title}</h1> */}

      <h2 className="text-rep outline-font mx-auto flex flex-col py-4 font-wide text-[60px] md:text-[85px] lg:text-[108px]">
        <span className="relative bg-white leading-none">{title}</span>
      </h2>

      <p className="text-sm text-gray-500 sm:text-lg">{description}</p>
    </div>
    <div className="group mx-auto mt-4 flex w-fit items-center space-x-2  text-center">
      <span className="font-mono text-gray-400 group-hover:-translate-x-2">[</span>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/learn">Learn</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/learn/${slug}`}>{title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <span className="font-mono text-gray-400 group-hover:translate-x-2">]</span>
    </div>
  </div>
);

const BlogListCard: FC<{
  blog: Blog;
  category: string;
  key: string;
}> = ({ blog, category, key }) => {
  const { slug, title, description, author, updatedAt, display } = blog;
  const formattedDate = new Date(updatedAt).toDateString();
  return (
    <Link href={{ pathname: `/learn/${category}/${slug}` }} legacyBehavior>
      <a
        className="text-md group flex items-center justify-between border-b py-8 text-gray-600 no-underline hover:text-blue-600"
        href={`/learn/${category}/${slug}`}
        key={key}
      >
        <div className="flex w-full items-center justify-between px-4">
          <div className="pl-2 group-hover:translate-x-2">
            <h5 className="text-md font-bold text-slate-900">{title}</h5>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>

          <div className="flex flex-row space-x-4">
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
              {/* <img
                className="h-16 w-16 rounded-lg object-cover shadow-sm"
                src={display}
                alt="blog display"
              /> */}
            </div>
            <div className="flex flex-row space-x-2 px-4 transition-transform group-hover:translate-x-2 items-center">
              <span className="block text-xs font-semibold text-gray-600">READ</span>
              <ArrowRightIcon className="block text-xs text-gray-600" />
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const CategoryPage = ({ blogs, category }) => (
  <>
    <WebsiteLayout title={category.title}>
      <div className="flex-grow bg-gray-50 pb-20 pt-2">
        <BlogHeader
          title={category.title}
          description={category.description}
          slug={category.slug}
        />
        <div className="container mx-auto max-w-4xl px-4">
          {blogs.map(blog => (
            <BlogListCard category={category.slug} blog={blog} key={blog.slug} />
          ))}
        </div>
      </div>
    </WebsiteLayout>
  </>
);
export default CategoryPage;
