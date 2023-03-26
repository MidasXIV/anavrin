import { FC } from "react";
import LanguagePicker from "../language-picker";
import LaunchAppButton from "../launch-app-button";

const WebsiteHeader: FC<unknown> = () => (
  <header className="sticky inset-x-0 top-0 z-50 flex w-full flex-wrap border-b border-gray-200 bg-white py-3 text-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-nowrap sm:justify-start sm:py-0">
    <nav
      className="relative mx-auto w-full max-w-7xl px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
      aria-label="Global"
    >
      <div className="flex items-center justify-between">
        <a className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">
          Anavrin
        </a>
      </div>
      <div className="hs-collapse grow basis-full overflow-hidden transition-all duration-300">
        <div className="mt-0 flex flex-row items-center justify-end gap-y-0 gap-x-7 pl-7">
          <a
            className="font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 sm:py-6"
            href="#"
          >
            Theme Picker
          </a>
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
      </div>
    </nav>
  </header>
);

export default WebsiteHeader;
