import { FC, useState } from "react";
import LanguagePicker from "../language-picker";
import LaunchAppButton from "../launch-app-button";
import ThemeToggle from "../theme-toggle/theme-toggle";

const WebsiteHeader: FC<unknown> = () => (
  <>
    <header className="clearNav sticky inset-x-0 top-0 z-50 flex w-full flex-wrap bg-white text-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-nowrap sm:justify-start sm:py-0">
      <nav
        className="relative mx-auto w-full max-w-7xl px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <a
            className="flex-none text-xl font-semibold dark:text-white"
            href="#"
            aria-label="Brand"
          >
            // Anavrin //
          </a>
        </div>
        <div className=" dark:bg-gray-900">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <div
              className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
              id="navbar-search"
            >
              <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 md:dark:bg-gray-900">
                <li>
                  <a
                    href="#"
                    className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  >
                    Features
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="hs-collapse grow basis-full overflow-hidden transition-all duration-300"> */}
        <div className="mt-0 flex flex-row items-center justify-end gap-x-7 gap-y-0 pl-7">
          {/* <ThemeToggle /> */}
          <a
            className="font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 sm:py-6"
            href="#"
          >
            <LanguagePicker />
          </a>

          <a
            className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 sm:border-l sm:border-gray-300 sm:pl-6"
            href="#"
          >
            <LaunchAppButton />
          </a>
        </div>
        {/* </div> */}
      </nav>
    </header>
  </>
);
export default WebsiteHeader;
