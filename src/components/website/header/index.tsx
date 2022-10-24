import { FC } from "react";
import LanguagePicker from "../language-picker";
import LaunchAppButton from "../launch-app-button";

const WebsiteHeader: FC<unknown> = () => (
  <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
    <nav
      className="relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
      aria-label="Global"
    >
      <div className="flex items-center justify-between">
        <a className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">
          Anavrin
        </a>
      </div>
      <div className="hs-collapse overflow-hidden transition-all duration-300 basis-full grow">
        <div className="flex flex-row items-center justify-end gap-y-0 gap-x-7 mt-0 pl-7">
          <a
            className="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500"
            href="#"
          >
            Theme Picker
          </a>
          <a
            className="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500"
            href="#"
          >
            <LanguagePicker />
          </a>

          <a
            className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 sm:border-l sm:border-gray-300 sm:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500"
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
