import { FC, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import LanguagePicker from "../language-picker";
import LaunchAppButton from "../launch-app-button";
import ThemeToggle from "../theme-toggle/theme-toggle";

const WebsiteHeader: FC<unknown> = () => {
  const router = useRouter();
  return (
    <>
      <header className="clearNav sticky inset-x-0 top-4 z-50 mx-auto my-4 w-fit flex-wrap rounded-md bg-white text-sm shadow-md">
        <nav
          className="relative px-4 py-2 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <div className="flex items-center justify-center px-2">
            <a
              className="flex-none text-2xl font-semibold dark:text-white"
              href="#"
              aria-label="Brand"
            >
              <span className="outline-font font-wide text-xl">ANAVRIN</span>
            </a>
          </div>
          <div className="mx-auto flex flex-wrap items-center justify-between px-6">
            <div
              className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
              id="navbar-search"
            >
              <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 md:dark:bg-gray-900">
                <li>
                  <Link
                    href="#home"
                    className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  >
                    Features
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end space-x-2">
            {/* <ThemeToggle /> */}
            {/* <a
            className="font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 sm:py-6"
            href="#"
          >
            <LanguagePicker />
          </a> */}

            {/* <a
            className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 sm:border-l sm:border-gray-300 sm:pl-6"
            href="#"
          >
            <LaunchAppButton />
          </a> */}

            <button
              type="button"
              className="rounded-md px-4 py-2 hover:bg-orange-500 hover:text-white"
              onClick={() => router.push("/#register")}
            >
              Sign up
            </button>

            <button
              type="button"
              className="rounded-md bg-charcoal-300 px-4 py-2 text-white hover:bg-charcoal-900"
              onClick={() => router.push("/dashboard")}
            >
              Launch App
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};
export default WebsiteHeader;
