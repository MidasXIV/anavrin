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
import DeleteIcon from "../icons/deleteIcon";

const WebpushSubscription: FC<unknown> = () => {
  const [isIndeterminate, setIsIndeterminate] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [subscription, setSubscriptisubscription] = useState({});
  const [isDenied, setDenied] = useState(false);
  const [device, setDevice] = useState<string>("Unknown");
  const [isLoading, setLoading] = useState<boolean>(false);

  const notificationSubscriptionChanged = async (subscribedStatus: boolean) => {
    setLoading(true);
    if (!subscribedStatus) {
      // delete subscription.
      unsubscribeDevice();
      setSubscribed(false);
      setSubscriptisubscription(undefined);
      setLoading(false);
      return;
    }

    // Freeze UI
    const pushSubscription = await subscribeDevice();
    if (pushSubscription) {
      setSubscriptisubscription(pushSubscription);
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
          setSubscriptisubscription(_subscription);
        });
      }
      setIsIndeterminate(false);
    });
  }, []);

  const SubscriptionCard = _subscription => (
    <div className="mt-2 p-2 bg-gray-900 rounded-md">
      <div className="pb-2 text-gray-500 flex flex-row justify-between items-center">
        <h2 className="align-middle">{device}</h2>
        <DeleteIcon onClick={() => {}} />
      </div>
      <Code block>{JSON.stringify(_subscription, null, 2)}</Code>
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
      {subscription ? <SubscriptionCard subscription={subscription} /> : null}
    </>
  );
};
export default WebpushSubscription;
