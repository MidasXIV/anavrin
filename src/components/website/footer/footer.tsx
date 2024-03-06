import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { FC } from "react";

const WebsiteFooter: FC = () => (
  <footer className="">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div className="sm:flex sm:flex-row-reverse sm:items-center sm:justify-between">
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="flex content-center  text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <TwitterLogoIcon className="h-5 w-5" />
            <span className="sr-only">Twitter page</span>
          </a>
          <a
            href="#"
            className="flex content-center  text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <GitHubLogoIcon className="h-5 w-5" />
            <span className="sr-only">GitHub account</span>
          </a>
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            ©
            <Link href="/" className="hover:underline">
              Anavrin
            </Link>{" "}
            . 2023 All rights reserved.
          </span>
        </div>

        <div className="mt-4 flex items-center space-x-6 text-center sm:mt-0 sm:justify-center">
          <span className="text-xs">
            developed by:{" "}
            <a href="https://twitter.com/MidasXiv" className="hover:underline">
              @midasxiv
            </a>
          </span>
          <Link href="/privacy-policy" className="text-xs hover:text-gray-600">
            privacy policy
          </Link>
          <Link href="/terms-of-service" className="text-xs hover:text-gray-600">
            terms of service
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default WebsiteFooter;
