import { Divider } from "@mantine/core";
import { FC } from "react";

const DashboardPortfolioSectionLoading: FC<unknown> = () => (
  <section className="flex h-full w-full items-center justify-center">
    <div className="flex w-full grid-cols-4 flex-col gap-3 px-6 lg:grid">
      <div className="col-span-3 max-w-full">
        <div className="grid h-full animate-pulse auto-cols-[333px] grid-flow-col gap-3 rounded-md">
          <div className="block h-full w-full rounded-md border-gray-100 bg-gray-50 p-6">
            <p className="mb-2 h-6 w-3/4 animate-pulse rounded-md bg-gray-600" />
            <p className="my-2 h-12 w-1/2 animate-pulse rounded-md border bg-gray-400 text-gray-400" />
            <p className="my-2 h-36 animate-pulse rounded-md border bg-gray-400 text-gray-400" />
            <Divider my="sm" />
            <p className="my-2 h-24 animate-pulse rounded-md border bg-gray-400 text-gray-400" />
          </div>

          <div className="block h-full w-full rounded-md border-gray-100 bg-gray-50 p-6">
            <p className="mb-2 h-6 w-3/4  animate-pulse rounded-md bg-gray-600" />
            <p className="my-2 h-12 w-1/2 animate-pulse rounded-md border bg-gray-400 text-gray-400" />
            <p className="my-2 h-36 animate-pulse rounded-md border bg-gray-400 text-gray-400" />
            <Divider my="sm" />
            <p className="my-2 h-24 animate-pulse rounded-md border bg-gray-400 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="col-span-1 max-w-full animate-pulse rounded-md">
        <div className="grid h-full w-full max-w-full grid-cols-2 gap-3 lg:grid-cols-none lg:grid-rows-2">
          <div className="block h-full w-full animate-pulse rounded-md border border-gray-100 bg-gray-50 p-6">
            <p className="mb-2 h-6 w-3/4  animate-pulse rounded-md bg-gray-600" />
            <p className="my-2 h-1/2 w-full animate-pulse rounded-md border bg-gray-400 text-gray-400" />
          </div>
          <div className="block h-full w-full animate-pulse rounded-md border border-gray-100 bg-gray-50 p-6">
            <p className="mb-2 h-6 w-3/4  animate-pulse rounded-md bg-gray-600" />
            <p className="my-2 h-1/4 w-full animate-pulse rounded-md border bg-gray-400 text-gray-400" />
            <p className="my-2 h-1/4 w-1/2 animate-pulse rounded-md border bg-gray-400 text-gray-400" />
            <p className="my-2 h-1/4 w-full animate-pulse rounded-md border bg-gray-400 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DashboardPortfolioSectionLoading;
