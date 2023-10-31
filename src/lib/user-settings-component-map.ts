import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { ExchangeKeys } from "../components/exchanges-form";
import LoadingForm from "../components/exchanges-form/loading";

const BinanceForm = dynamic(() => import("../components/exchanges-form/binance"), {
  loading: LoadingForm
});
const DummyForm = dynamic(() => import("../components/exchanges-form/dummy"), {
  loading: LoadingForm
});

const PushNotificationPanel = dynamic(() => import("../components/push-notification-panel"), {
  loading: LoadingForm
});

const SubscriptionPanel = dynamic(() => import("../components/subscription-panel"), {
  loading: LoadingForm
});

enum MenuItems {
  WEBPUSH = "webpush",
  SUBSCRIPTION = "subscription"
}

export enum PanelKeys {
  BINANCE = ExchangeKeys.BINANCE,
  DUMMY = ExchangeKeys.DUMMY,
  WEBPUSH = MenuItems.WEBPUSH,
  SUBSCRIPTION = MenuItems.SUBSCRIPTION
}

export const UserSettingsComponentMapping = new Map<PanelKeys, ComponentType<unknown>>([
  [PanelKeys.BINANCE, BinanceForm],
  [PanelKeys.DUMMY, DummyForm],
  [PanelKeys.WEBPUSH, PushNotificationPanel],
  [PanelKeys.SUBSCRIPTION, SubscriptionPanel]
]);
