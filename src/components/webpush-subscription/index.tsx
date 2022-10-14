import { Code, Checkbox, CheckboxProps, Divider, LoadingOverlay, Loader } from "@mantine/core";
import { FC, useEffect, useRef, useState } from "react";
import {
  isNotificationPermissionDenied,
  isServiceWorkerSupported,
  getDeviceSubscription,
  isUserSubscribed,
  isWebPushSupported,
  subscribeDevice,
  unsubscribeDevice
} from "../../lib/webpush-notification";
import postDeleteSubscription from "../../util/deletePushSubscription";
import fetchPushSubscription from "../../util/fetchPushSubscription";
import DeleteIcon from "../icons/deleteIcon";

const WebpushSubscription: FC<unknown> = () => {
  const [isIndeterminate, setIsIndeterminate] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription>();
  const [isDenied, setDenied] = useState(false);
  const [device, setDevice] = useState<string>("Unknown");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [savedPushSubscriptions, setSavedPushSubscriptions] = useState<Array<PushSubscription>>([]);

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
        });
      }
      setIsIndeterminate(false);
    });

    fetchPushSubscription().then(({ status, data }) => {
      if (status === 200) {
        setSavedPushSubscriptions(data.subscriptions);
      }
    });
  }, []);

  const SubscriptionCard = ({ subscription: pushSubscription }) => (
    <div className="mt-2 p-2 bg-gray-900 rounded-md">
      <div className="pb-2 text-gray-500 flex flex-row justify-between items-center">
        <h2 className="align-middle">{device}</h2>
        <DeleteIcon
          onClick={() => {
            // TODO: start loader on the card
            console.log(`Delete ${pushSubscription._id}`);
            // eslint-disable-next-line no-underscore-dangle
            const isSubscriptionDeleted = postDeleteSubscription(pushSubscription._id);

            const deleteCurrentDeviceSubscription =
              subscription.endpoint === pushSubscription.endpoint;
            if (isSubscriptionDeleted && deleteCurrentDeviceSubscription) {
              unsubscribeDevice();
              setSubscribed(false);
              setSubscription(undefined);
            }
            // TODO: Depending on the result change state.
          }}
        />
      </div>
      <Code block>{JSON.stringify(pushSubscription, null, 2)}</Code>
    </div>
  );
  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        loaderProps={{ size: "lg", color: "dark", variant: "bars" }}
      />
      <Checkbox
        disabled={isDenied}
        indeterminate={isIndeterminate}
        checked={subscribed}
        label="Allow Anavrin to send push notifications on this device."
        onChange={event => notificationSubscriptionChanged(event.currentTarget.checked)}
      />
      {isDenied ? (
        <p className="text-xs text-red-500">Permission to send webpush is blocked on this device</p>
      ) : null}
      <Divider margins="md" />
      {/* {subscription ? <SubscriptionCard subscription={subscription} /> : null} */}
      {savedPushSubscriptions.length ? (
        savedPushSubscriptions.map(savedPushSubscription => (
          <SubscriptionCard
            subscription={savedPushSubscription}
            // eslint-disable-next-line no-underscore-dangle
            key={`subscription-card-${savedPushSubscription._id}`}
          />
        ))
      ) : (
        <p className="text-xs text-red-500">You have not opted for push subscriptions by Anavrin</p>
      )}
    </>
  );
};
export default WebpushSubscription;
