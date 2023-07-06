import api from "../services/create-service";

const vapidDetails = {
  PUBLIC_KEY:
    "BAi3lOgTgflyTZzJOyVCDSCQDK9xH4pE-wnYvP9B3TRSKnAKLTcASjNnGp-pCZMwVH7PnZmv5LQicf0gNi2O0n4"
};

const isNotificationPermissionDenied = (): boolean => Notification.permission === "denied";

const isServiceWorkerSupported = (): boolean => {
  if (!("serviceWorker" in navigator)) {
    // Service Worker isn't supported on this browser, disable or hide UI.
    return false;
  }
  return true;
};

const isWebPushSupported = (): boolean => {
  if (!("PushManager" in window)) {
    // Push isn't supported on this browser, disable or hide UI.
    return false;
  }
  return true;
};

const getDeviceSubscription = async (): Promise<PushSubscription> => {
  const swRegistration = await navigator.serviceWorker.ready;
  const swSubscription = await swRegistration.pushManager.getSubscription();
  return swSubscription;
};

const isUserSubscribed = async (): Promise<boolean> => {
  const swSubscription = await getDeviceSubscription();
  if (swSubscription) {
    return true;
  }
  return false;
};

const base64ToUint8Array = base64 => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const unsubscribeDevice = async (): Promise<void> => {
  try {
    const swSubscription = await getDeviceSubscription();

    if (!swSubscription) {
      // Device was not subscribed.
      return;
    }

    // Delete pushSubscription from database.

    await swSubscription.unsubscribe();
  } catch (e) {
    console.error(e);
  }
};

const subscribeDevice = async (): Promise<PushSubscription> => {
  try {
    if (!isServiceWorkerSupported()) {
      // Service Worker isn't supported on this browser, disable or hide UI.
      return undefined;
    }

    if (!isWebPushSupported()) {
      // Push isn't supported on this browser, disable or hide UI.
      return undefined;
    }

    const swRegistration = await navigator.serviceWorker.ready;

    const swSubscription = await swRegistration.pushManager.getSubscription();

    if (swSubscription) {
      return swSubscription;
    }

    const pushSubscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(vapidDetails.PUBLIC_KEY)
    });

    console.log("Received PushSubscription: ", JSON.stringify(pushSubscription));

    // Save pushSubscription in database.

    const result = await api.postSaveSubscription({ subscription: pushSubscription });
    console.log(result);
    return pushSubscription;
  } catch (e) {
    console.error(e);
  }
  return undefined;
};

const deleteSubscriptionFromDb = async (
  pushSubscription: PushSubscriptionDocument
): Promise<void> => {
  // eslint-disable-next-line no-underscore-dangle
  const isSubscriptionDeleted = await api.postDeleteSubscription({
    subscriptionId: pushSubscription._id
  });
  const subscription = await getDeviceSubscription();
  const deleteCurrentDeviceSubscription =
    subscription?.endpoint === pushSubscription.endpoint ?? false;
  if (isSubscriptionDeleted && deleteCurrentDeviceSubscription) {
    unsubscribeDevice();
  }
};

export {
  isNotificationPermissionDenied,
  isServiceWorkerSupported,
  isWebPushSupported,
  getDeviceSubscription,
  isUserSubscribed,
  unsubscribeDevice,
  subscribeDevice,
  deleteSubscriptionFromDb
};
