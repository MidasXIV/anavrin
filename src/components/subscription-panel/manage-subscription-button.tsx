import { useRouter } from "next/router";
import { FC } from "react";
import BoxButton from "../box-button/box-button";
import api from "../../services/create-service";

const ManageSubscriptionButton: FC<{ subscription: Record<string, unknown> }> = ({
  subscription
}) => {
  const router = useRouter();
  const redirectToCustomerPortal = async () => {
    try {
      const createLinkDataObject = await api.createPortalLink();
      const { url } = createLinkDataObject.data;
      router.push(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <p className="pb-4 sm:pb-0">Manage your subscription on Stripe.</p>
      <BoxButton variant="slim" disabled={!subscription} onClick={redirectToCustomerPortal}>
        Open customer portal
      </BoxButton>
    </div>
  );
};

export default ManageSubscriptionButton;
