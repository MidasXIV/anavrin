import { FC } from "react";
import Register from "../components/website/register";
import DefaultLayout from "../layouts/default";

const Overview: FC = () => (
  <>
    <DefaultLayout title="Register" sidebar="register" description="Signup for Anavrin">
      <Register />
    </DefaultLayout>
  </>
);

export default Overview;
