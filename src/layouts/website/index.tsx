import Head from "next/head";
import WebsiteFooter from "../../components/website/footer/footer";
import WebsiteHeader from "../../components/website/header";

const WebsiteLayout = ({ title, children }) => {
  const pagetTitle = `Anavrin | ${title}`;
  return (
    <div className="flex h-screen flex-col bg-white">
      <Head>
        <title>{pagetTitle}</title>
      </Head>
      <WebsiteHeader />
      {children}
      <WebsiteFooter />
    </div>
  );
};
export default WebsiteLayout;
