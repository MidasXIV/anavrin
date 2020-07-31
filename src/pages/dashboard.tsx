import { AppHeader, Loading } from "../components";
import { signIn, signOut, useSession } from "next-auth/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!session && !loading) router.push("/");
  }, [session, loading]);

  return session ? (
    <main>
      <AppHeader
        title={`Hello there, ${session.user.name}`}
        description="You can see your portfolios estimated value & progress below:"
        currentPage={{ label: "Home", path: "/dashboard" }}
        otherPages={[{ label: "Portfolio", path: "/dashboard/portfolio" }]}
      />
    </main>
  ) : loading ? (
    <Loading />
  ) : null;
}
