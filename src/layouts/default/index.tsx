import { FC, ReactNode } from "react";
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
  children?: ReactNode;
};

const DefaultLayout: FC<DefaultLayoutProps> = ({ title, description, sidebar, children }) => {
  const pagetTitle = `Anavrin | ${title}`;
  return (
    <>
      <Head>
        <title>{pagetTitle}</title>
      </Head>
      <div className="flex h-screen w-screen flex-col-reverse bg-charcoal-900 sm:flex-row">
        <Sidebar select={sidebar} />
        <div className="flex w-full flex-1 flex-col overflow-auto">
          <Header title={title} description={description} />
          {children}
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
