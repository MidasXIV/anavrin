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

const AIAPIKeysForm = dynamic(() => import("../components/ai-api-keys-form"), {
  loading: LoadingForm
});

enum MenuItems {
  WEBPUSH = "webpush",
  AI_API_KEYS = "ai-api-keys"
}

export enum PanelKeys {
  BINANCE = ExchangeKeys.BINANCE,
  DUMMY = ExchangeKeys.DUMMY,
  WEBPUSH = MenuItems.WEBPUSH,
  AI_API_KEYS = MenuItems.AI_API_KEYS
}

export const UserSettingsComponentMapping = new Map<PanelKeys, ComponentType<unknown>>([
  [PanelKeys.BINANCE, BinanceForm],
  [PanelKeys.DUMMY, DummyForm],
  [PanelKeys.WEBPUSH, PushNotificationPanel],
  [PanelKeys.AI_API_KEYS, AIAPIKeysForm]
]);
