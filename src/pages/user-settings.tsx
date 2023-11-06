import { FC, useState } from "react";
import { Accordion } from "@mantine/core";
import { useSession } from "next-auth/react";
import DefaultLayout from "../layouts/default";
import * as exchanges from "../components/exchanges-form";
import { isMobileUI } from "../lib/viewport";
import SecondaryPanel from "../components/secondary-panel";
import { UserSettingsComponentMapping, PanelKeys } from "../lib/user-settings-component-map";

const SETTING_KEY_VALUES = {
  connectToExchange: "connect-to-exchange",
  webpush: "webpush",
  stripeSubscription: "stripe-subscription"
} as const;

type SETTING_KEY_VALUES = (typeof SETTING_KEY_VALUES)[keyof typeof SETTING_KEY_VALUES];

const UserSettings: FC = () => {
  const defaultPanel = PanelKeys.SUBSCRIPTION;
  const defaultAccordianItem = SETTING_KEY_VALUES.stripeSubscription;
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [opened, setOpened] = useState(false);
  const isSignedIn = loading ? "" : Boolean(session?.user) ?? false;
  const [panel, setPanel] = useState<PanelKeys>(defaultPanel);
  const [menuItem, setMenuItem] = useState<string>();

  const onExchangeButtonClick = (exchange: PanelKeys) => {
    // Pass in the exchange name which can be understood by the Form Factory.
    // sets the secondary Panel.
    setPanel(exchange);
    // Only in Mobile UI should the Secondary Panel as a drawer.
    if (isMobileUI()) {
      setOpened(true);
    }
  };

  const Exchanges = exchanges.list.map(exchange =>
    // eslint-disable-next-line import/namespace
    exchanges[exchange]({ onClick: onExchangeButtonClick })
  );

  const onMenuItemClick = (selectedMenuItem: SETTING_KEY_VALUES) => {
    // MenuState: {0: true, 1: false}

    // TODO add null check; null is emmited when the panel is clicked
    // TODO: implement unSetPanel

    // const selectedMenuItem = Object.entries(MenuState).find(menuStateItem => {
    //   const [menuKey, isOpened] = menuStateItem;
    //   return isOpened;
    // })?.[0];

    switch (selectedMenuItem) {
      case SETTING_KEY_VALUES.connectToExchange: // Exchange Selection
        break;
      case SETTING_KEY_VALUES.webpush: // WebPush Menu Item
        setPanel(PanelKeys.WEBPUSH);
        break;
      case SETTING_KEY_VALUES.stripeSubscription: // Stripe account Menu Item
        setPanel(PanelKeys.SUBSCRIPTION);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <DefaultLayout title="User setting" sidebar="" description="Update user profile">
        <div className="flex h-full w-full flex-1 flex-row overflow-auto">
          <div className="dashboard-primary-panel overflow-y-auto">
            {!isSignedIn ? <h1 className="mb-2 text-2xl">Please Login.</h1> : null}
            <Accordion
              defaultValue={defaultAccordianItem}
              className="border-b border-t-0 border-gray-400"
              onChange={onMenuItemClick}
            >
              <Accordion.Item
                className="border-b border-t-0 border-gray-400 font-normal"
                value={SETTING_KEY_VALUES.stripeSubscription}
              >
                <Accordion.Control>
                  <h1 className="mb-2 text-2xl">Manage Anavrin Subscription.</h1>
                </Accordion.Control>
              </Accordion.Item>
              <Accordion.Item
                className="border-b border-t-0 border-gray-400 font-normal"
                value={SETTING_KEY_VALUES.connectToExchange}
              >
                <Accordion.Control>
                  <h1 className="mb-2 text-2xl">
                    Connect <span className="font-semibold">Anavrin</span> to an exchange account.
                  </h1>
                </Accordion.Control>
                <Accordion.Panel>
                  <p className="text-md text-gray-600">
                    We currently only support Binance exchange.
                  </p>
                  <section className="my-4 grid grid-cols-4 gap-4">{Exchanges}</section>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value={SETTING_KEY_VALUES.webpush}>
                <Accordion.Control>
                  <h1 className="mb-2 text-2xl">Authorize webpush subscriptions.</h1>
                </Accordion.Control>
              </Accordion.Item>
            </Accordion>
          </div>
          <SecondaryPanel
            PanelComponentMapping={UserSettingsComponentMapping}
            panel={panel}
            opened={opened}
            setOpened={setOpened}
          />
        </div>
      </DefaultLayout>
    </>
  );
};

export default UserSettings;
