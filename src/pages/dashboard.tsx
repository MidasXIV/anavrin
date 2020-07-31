import { AppHeader, Loading } from "../components";

export default function Dashboard() {
  return (
    <main>
      <AppHeader
        title='Hello there'
        description="You can see your portfolios estimated value & progress below:"
        currentPage={{ label: "Home", path: "/dashboard" }}
        otherPages={[{ label: "Portfolio", path: "/dashboard/portfolio" }]}
      />
    </main>
  )
}
