import { FC } from "react";

const LoadingForm: FC<any> = () => (
  <form>
    <section className="py-8">
      <div className="p-2">
        <div className="mb-2 h-8 w-1/4 animate-pulse rounded-md bg-gray-600" />
        <div className="mb-2 h-4 w-1/2 animate-pulse rounded-md bg-gray-400" />
        <div className="h-14 w-full animate-pulse rounded-md bg-gray-400" />
      </div>
      <div className="mt-4 p-2">
        <div className="mb-2 h-8 w-1/4 animate-pulse rounded-md bg-gray-600" />
        <div className="mb-2 h-4 w-1/2 animate-pulse rounded-md bg-gray-400" />
        <div className="h-14 w-full animate-pulse rounded-md bg-gray-400" />
      </div>
      <div className="ml-2 mt-4 h-8 w-1/2 animate-pulse rounded-md bg-blue-400 p-2" />
    </section>
  </form>
);

export default LoadingForm;
