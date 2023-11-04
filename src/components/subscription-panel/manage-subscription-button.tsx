import { useRouter } from "next/router";
import BoxButton from "../box-button/box-button";

const ManageSubscriptionButton = ({ session }) => {
  const router = useRouter();
  const redirectToCustomerPortal = async () => {
    try {
      // const { url } = await postData({
      //   url: "/api/create-portal-link"
      // });
      // router.push(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <p className="pb-4 sm:pb-0">Manage your subscription on Stripe.</p>
      <BoxButton variant="slim" disabled={!session} onClick={redirectToCustomerPortal}>
        Open customer portal
      </BoxButton>
    </div>
  );
};

export default ManageSubscriptionButton;
