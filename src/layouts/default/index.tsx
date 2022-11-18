import { FC } from "react";
import Head from "next/head";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

type Page = {
  label: string;
  path: string;
};

type DefaultLayoutProps = {
  title: string;
  description: string;
  sidebar: string;
  // eslint-disable-next-line react/require-default-props
  children?: unknown;
};

const DefaultLayout: FC<DefaultLayoutProps> = ({ title, description, sidebar, children }) => (
  <>
    <Head>
      <title>Anavrin | {title}</title>
    </Head>
    <div className="flex h-screen w-screen flex-col-reverse sm:flex-row">
      <Sidebar select={sidebar} />
      <div className="flex w-full flex-1 flex-col overflow-auto">
        {/* <AppHeader
            title={title}
            description={description}
            currentPage={{ label: "Home", path: "/dashboard" }}
            otherPages={[{ label: "Portfolio", path: "/portfolio" }]}
          /> */}
        <Header title={title} description={description} />
        {children}
      </div>
    </div>
  </>
);

export default DefaultLayout;
