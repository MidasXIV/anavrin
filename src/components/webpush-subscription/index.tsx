import { Code, LoadingOverlay } from "@mantine/core";
import { Separator } from "@/components/ui/separator";

import { FC, useEffect, useState } from "react";
import { BellIcon } from "@radix-ui/react-icons";
import {
  isNotificationPermissionDenied,
  isServiceWorkerSupported,
  getDeviceSubscription,
  isUserSubscribed,
  isWebPushSupported,
  subscribeDevice,
  unsubscribeDevice,
  deleteSubscriptionFromDb
} from "../../lib/webpush-notification";
import api from "../../services/create-service";
import { Switch } from "../ui/switch";
import Card from "../portfolio-widgets/Card/card";
import DoubleClickButton from "../double-click-button";
import CrossIconSVG from "../icons/crossIconSVG";
import TooltipWrapper from "../tooltip-wrapper";

const WebpushSubscription: FC<unknown> = () => {
  const [isIndeterminate, setIsIndeterminate] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription>();
  const [isDenied, setDenied] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [savedPushSubscriptions, setSavedPushSubscriptions] = useState<
    Array<PushSubscriptionDocument>
  >([]);

  const notificationSubscriptionChanged = async (subscribedStatus: boolean) => {
    setLoading(true);
    if (!subscribedStatus) {
      // delete subscription.
      unsubscribeDevice();
      setSubscribed(false);
      setSubscription(undefined);
      setLoading(false);
      return;
    }

    // Freeze UI
    const pushSubscription = await subscribeDevice();
    if (pushSubscription) {
      setSubscription(pushSubscription);
      setSubscribed(true);
    } else {
      setSubscribed(false);
    }
    // Unfreeze UI

    if (isNotificationPermissionDenied()) {
      setDenied(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isNotificationPermissionDenied() || !isWebPushSupported() || !isServiceWorkerSupported()) {
      setDenied(true);
    }

    isUserSubscribed().then(isSubscribed => {
      if (isSubscribed) {
        setSubscribed(true);
        getDeviceSubscription().then(_subscription => {
          setSubscription(_subscription);
          console.log(subscription);
        });
      } else {
        setSubscribed(false);
        setSubscription(undefined);
      }
      setIsIndeterminate(false);
    });

    api.fetchPushSubscription().then(({ status, data }) => {
      if (status === 200) {
        setSavedPushSubscriptions(data.subscriptions);
      }
    });
  }, [isLoading]);

  const SubscriptionCard = ({ subscription: pushSubscription }) => (
    <div className="max-h-fit">
      <Card
        showHeader
        customHeader
        header={
          <>
            <span>Unknown device</span>
            <DoubleClickButton
              onClick={async () => {
                setLoading(true);
                await deleteSubscriptionFromDb(pushSubscription);
                setLoading(false);
              }}
              label={<CrossIconSVG />}
              className="rounded p-1 font-bold text-white"
              activeClassName="bg-red-500 hover:bg-red-800"
              inactiveClassName="bg-charcoal-300 hover:bg-red-400"
              tooltipLabel="Delete subscription"
              activatedTooltipLabel="Click again to delete!"
            />
          </>
        }
      >
        <Code block>{JSON.stringify(pushSubscription, null, 2)}</Code>
      </Card>
    </div>
  );
  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        loaderProps={{ size: "lg", color: "dark", variant: "bars" }}
      />
      <div className="flex items-center space-x-4 rounded-md border border-charcoal-400 p-4">
        <BellIcon />
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">Push Notifications</p>
          <p className="text-sm text-muted-foreground">
            Allow Anavrin to send push notifications on this device.
          </p>
        </div>
        {/* <TooltipWrapper
          label={subscribed ? "Unsubscribe this device." : "Subscribe this device!"}
          color="orange"
        > */}
        <Switch
          disabled={isDenied}
          checked={subscribed}
          onCheckedChange={isSubscribed => notificationSubscriptionChanged(isSubscribed)}
        />
        {/* </TooltipWrapper> */}
      </div>
      {isDenied ? (
        <p className="text-xs text-red-500">Permission to send webpush is blocked on this device</p>
      ) : null}
      <Separator decorative className="my-4 bg-charcoal-400" />
      <section className="space-y-2">
        {savedPushSubscriptions.length ? (
          savedPushSubscriptions.map(savedPushSubscription => (
            <SubscriptionCard
              subscription={savedPushSubscription}
              // eslint-disable-next-line no-underscore-dangle
              key={`subscription-card-${savedPushSubscription._id}`}
            />
          ))
        ) : (
          <p className="text-xs text-red-500">
            You have not opted for push subscriptions by Anavrin
          </p>
        )}
      </section>
    </>
  );
};
export default WebpushSubscription;
