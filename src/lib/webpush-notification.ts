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

export {
  isNotificationPermissionDenied,
  isServiceWorkerSupported,
  isWebPushSupported,
  getDeviceSubscription,
  isUserSubscribed
};
