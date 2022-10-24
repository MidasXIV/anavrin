import { FC } from "react";

const Register: FC<unknown> = () => (
  <div className="container mx-auto font-mono p-8">
    <div className="w-full lg:w-1/2 mx-auto">
      <p className="w-max flex flex-row text-center p-1 px-2 mb-3 mx-auto rounded-xl bg-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
        <span className="ml-2 uppercase">Get Project Updates</span>
      </p>
      <div className="px-8 mb-4 text-center">
        <h3 className="pt-4 mb-2 text-5xl font-medium">Stay in the loop</h3>
        <p className="mb-4 text-sm text-gray-700 font-bold">
          We&apos;re just getting started. Subscribe for updates on Anavrin.
        </p>
      </div>
      <form action="" className="w-3/4 mx-auto flex flex-col gap-3 px-8 pt-4 mb-4 sm:flex-row">
        <input
          type="email"
          name="email"
          id="email"
          className="flex-1 rounded-lg border border-transparent bg-violet-200/50 py-3 px-5 placeholder:text-black/30 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          placeholder="Enter your email Address..."
        />
        <button type="submit" className="rounded-lg bg-black px-5 py-3 font-bold text-white">
          Submit
        </button>
      </form>
      <div className="text-center text-sm text-gray-700">
        We&apos;ll never share this info. No spam, ever.
      </div>
    </div>
  </div>
);

export default Register;
