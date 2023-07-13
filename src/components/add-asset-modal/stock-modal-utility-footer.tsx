const UtilityFooter = () => (
  <dl className="hidden flex-row justify-between border-t border-gray-200 p-2 text-xs sm:flex">
    <dt className="flex flex-row items-center space-x-2">
      <kbd className="rounded-md bg-charcoal-400 p-2 text-sm text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4"
        >
          <path
            fillRule="evenodd"
            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </kbd>
      <kbd className="rounded-md bg-charcoal-400 p-2 text-sm text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4"
        >
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </kbd>
      <p>to navigate.</p>
    </dt>
    <dt className="flex flex-row items-center space-x-2">
      <kbd className="rounded-md bg-charcoal-400 px-3 py-1 text-sm text-gray-300">ENTER</kbd>
      <p>to select.</p>
    </dt>
    <dt className="flex flex-row items-center space-x-2">
      <kbd className="rounded-md bg-charcoal-400 px-3 py-1 text-sm text-gray-300">ESC</kbd>
      <p>to cancel.</p>
    </dt>
  </dl>
);

export default UtilityFooter;
