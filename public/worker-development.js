/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/* eslint-disable no-restricted-globals */
// listen to message event from window
self.addEventListener("message", event => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log(event === null || event === void 0 ? void 0 : event.data);
  self.registration.showNotification("Aloha", {
    body: event === null || event === void 0 ? void 0 : event.data,
    icon: "/icons/android-chrome-192x192.png"
  });
});
self.addEventListener("push", event => {
  const data = JSON.parse((event === null || event === void 0 ? void 0 : event.data.text()) || "{}");
  const title = data.title || "Push Codelab";
  const options = {
    body: data.message || "Yay it works.",
    icon: "/icons/android-chrome-192x192.png" // badge: 'images/badge.png'

  };
  event === null || event === void 0 ? void 0 : event.waitUntil(self.registration.showNotification(title, options));
});
/******/ })()
;