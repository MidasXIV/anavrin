import { FC } from "react";
import Head from "next/head";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

// import NProgress from "nprogress";

// NProgress.configure({ showSpinner: false });

// Router.onRouteChangeStart = () => NProgress.start();
// Router.onRouteChangeComplete = () => NProgress.done();
// Router.onRouteChangeError = () => NProgress.done();

type Page = {
  label: string;
  path: string;
};

type DefaultLayoutProps = {
  title: string;
  description: string;
  sidebar: string;
  children?: any;
};

const DefaultLayout: FC<DefaultLayoutProps> = ({ title, description, sidebar, children }) => (
  <>
    <Head>
      <title>Anavrin | {title}</title>
    </Head>
    <div className="flex flex-col-reverse sm:flex-row w-screen h-screen">
      <Sidebar select={sidebar} />
      <div className="w-full flex flex-1 flex-col overflow-auto">
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
