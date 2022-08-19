import { FC } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import DefaultLayout from "../layouts/default";

const Overview: FC = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  return (
    <>
      <DefaultLayout
        title="Overview"
        sidebar="overview"
        description="You can see your portfolios estimated value & progress below"
      >
        {session ? (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : loading ? (
          <div className="space-y-2">
            <div className="h-4 bg-gray-400 rounded" />
            <div className="h-4 bg-gray-400 rounded w-5/6" />
          </div>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </DefaultLayout>
    </>
  );
};

export default Overview;
