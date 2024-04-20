import Link from "next/link";
import { FC } from "react";
import {
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
  Card
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import WebsiteLayout from "../../layouts/website";
import { getCategories } from "../../lib/blog-utils-client";

const BlogHeader: FC<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <div className="border-b bg-white pb-5 pt-6 sm:pb-10">
    <div className="container mx-auto max-w-4xl px-4 text-center">
      <h2 className="text-rep outline-font mx-auto flex flex-col py-4 font-wide text-[60px] md:text-[85px] lg:text-[108px]">
        <span className="relative bg-white leading-none">{title}</span>
      </h2>

      <p className="text-sm text-gray-500 sm:text-lg">{description}</p>
    </div>
    <div className="mx-auto mt-4 w-fit">
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
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </div>
);
const BlogListItem: FC<{
  category: {
    title: string;
    slug: string;
    description: string;
  };
  key: string;
}> = ({ key, category }) => (
  <Link href={{ pathname: `/learn/${category.slug}` }} legacyBehavior>
    <a
      className="text-md group flex items-center justify-between border-b py-8 text-gray-600 no-underline hover:text-blue-600"
      href={`/learn/${category.slug}`}
      key={key}
    >
      <div className="flex flex-col px-4">
        <span className="transition-transform group-hover:translate-x-2">{category.title}</span>

        <span className="hidden text-xs capitalize text-gray-500 sm:block">
          {category.description}
        </span>
      </div>

      <div className="flex flex-row space-x-2 px-4 transition-transform group-hover:translate-x-2">
        <span className="block text-xs font-semibold text-gray-600">READ</span>
        <ArrowRightIcon className="block text-xs text-gray-600" />
      </div>
    </a>
  </Link>
);

const BlogListCard: FC<{
  category: {
    title: string;
    slug: string;
    description: string;
  };
  key: string;
}> = ({ key, category }) => (
  <Link href={{ pathname: `/learn/${category.slug}` }} legacyBehavior>
    <a className="group relative block " href={`/learn/${category.slug}`} key={key}>
      {/* <div className="pl-2">
        <h5 className="text-md font-bold text-slate-900">{slug}</h5>
        <p className="mt-1 text-sm text-slate-500">{slug}</p>
      </div> */}
      <Card className="bg-[#e6f8ff]">
        <CardHeader>
          <CardTitle>{category.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{category.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button className="text-blue-600" variant="ghost">
            Learn more
          </Button>
        </CardFooter>
      </Card>
    </a>
  </Link>
);

const CategoryPage = () => {
  const categories = getCategories();
  return (
    <>
      <WebsiteLayout title="Simulator">
        <div className="flex-grow bg-gray-50 pb-20 pt-2">
          <BlogHeader
            title="Learn"
            description="Exploring Airdrops and Stock Analysis: Unveiling Insights and Opportunities"
          />
          <div className="container mx-auto max-w-4xl px-4">
            {categories.map(category => (
              <BlogListItem key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </WebsiteLayout>
    </>
  );
};

export default CategoryPage;
