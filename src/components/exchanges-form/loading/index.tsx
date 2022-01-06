import { FC } from "react";

const LoadingForm: FC<any> = () => (
  <form>
    <section className="py-8">
      <div className="p-2">
        <div className="mb-2 bg-gray-600 animate-pulse h-8 w-1/4 rounded-md" />
        <div className="mb-2 bg-gray-400 animate-pulse h-4 w-1/2 rounded-md" />
        <div className="bg-gray-400 w-full animate-pulse h-14 rounded-md" />
      </div>
      <div className="mt-4 p-2">
        <div className="mb-2 bg-gray-600 animate-pulse h-8 w-1/4 rounded-md" />
        <div className="mb-2 bg-gray-400 animate-pulse h-4 w-1/2 rounded-md" />
        <div className="bg-gray-400 w-full animate-pulse h-14 rounded-md" />
      </div>
      <div className="mt-4 ml-2 p-2 bg-blue-400 animate-pulse h-8 w-1/2 rounded-md" />
    </section>
  </form>
);

export default LoadingForm;
