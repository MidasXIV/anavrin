import { Code, Checkbox, CheckboxProps } from "@mantine/core";
import { FC, useEffect, useRef, useState } from "react";
import {
  isNotificationPermissionDenied,
  isServiceWorkerSupported,
  getDeviceSubscription,
  isUserSubscribed,
  isWebPushSupported
} from "../../lib/webpush-notification";

const base64ToUint8Array = base64 => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const WebpushSubscription: FC<unknown> = () => {
  const [isIndeterminate, setIsIndeterminate] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [subscription, setSubscriptisubscription] = useState({});
  const [isDenied, setDenied] = useState(false);

  const vapid = {
    publicKey:
      "BAi3lOgTgflyTZzJOyVCDSCQDK9xH4pE-wnYvP9B3TRSKnAKLTcASjNnGp-pCZMwVH7PnZmv5LQicf0gNi2O0n4",
    privateKey: "2NgDFU4MbXNXEVWz-sty5KnVNPdC7-nP5dzWBu2jeF4"
  };
  const notificationSubscriptionChanged = async (subscribedStatus: boolean) => {
    try {
      if (!isServiceWorkerSupported()) {
        // Service Worker isn't supported on this browser, disable or hide UI.
        return;
      }

      if (!isWebPushSupported()) {
        // Push isn't supported on this browser, disable or hide UI.
        return;
      }

      const swRegistration = await navigator.serviceWorker.ready;

      const swSubscription = await swRegistration.pushManager.getSubscription();

      if (swSubscription) {
        // setSubscription(sub)
        // setIsSubscribed(true)

        await swSubscription.unsubscribe();
      }

      const pushSubscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64ToUint8Array(vapid.publicKey)
      });

      console.log("Received PushSubscription: ", JSON.stringify(pushSubscription));
      setSubscriptisubscription(pushSubscription);
    } catch (e) {
      console.error(e);

      if (isNotificationPermissionDenied()) {
        setDenied(true);
      }
    } finally {
    }
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

  return (
    <>
      <Checkbox
        disabled={isDenied}
        indeterminate={isIndeterminate}
        checked={subscribed}
        label="Allow Anavrin to send push notifications."
        onChange={event => notificationSubscriptionChanged(event.currentTarget.checked)}
      />
      {isDenied ? (
        <p className="text-xs text-red-500">Permission to send webpush is blocked</p>
      ) : null}
      {subscription ? <Code block>{JSON.stringify(subscription)}</Code> : null}
    </>
  );
};
export default WebpushSubscription;
