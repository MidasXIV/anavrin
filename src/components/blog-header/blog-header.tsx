import Link from "next/link";
import { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "../ui/breadcrumb";

const BlogHeader: FC<{
  title: string;
  description: string;
  breadcrumbs: Array<{ href: string; label: string }>;
}> = ({ title, description, breadcrumbs }) => (
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
          {breadcrumbs.map(({ label, href }, index) => (
            <>
              <BreadcrumbItem key={href}>
                <BreadcrumbLink asChild>
                  <Link href={href}>{label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <span className="font-mono text-gray-400 group-hover:translate-x-2">]</span>
    </div>
  </div>
);

export default BlogHeader;
