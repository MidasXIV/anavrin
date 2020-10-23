import { FC } from "react";
import Head from "next/head";
import Router from "next/router";
import AppHeader from "../../components/app-header";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

import styles from "./index.module.css";
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
  children?: any;
};

const DefaultLayout: FC<DefaultLayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* <AppHeader
        title={title}
        description={description}
        currentPage={{ label: "Home", path: "/dashboard" }}
        otherPages={[{ label: "Portfolio", path: "/portfolio" }]}
      /> */}
      <div className="flex flex-row">
        <Sidebar />
        <div className="w-full flex flex-col">
          <Header />
          <div className="w-full h-full flex flex-row">
            <div className={styles.primary}>Main Panel</div>
            <div className={styles.secondary}>Secondary Panel</div>
          </div>
        </div>

        {/* {children} */}
      </div>
    </>
  );
};

export default DefaultLayout;
