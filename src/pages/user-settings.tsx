import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import DefaultLayout from "../layouts/default";
import * as exchanges from "../components/exchanges-form";
import { isMobileUI } from "../lib/viewport";
import SecondaryPanel from "../components/secondary-panel";
import { UserSettingsComponentMapping, PanelKeys } from "../lib/user-settings-component-map";

const SETTING_KEY_VALUES = {
  connectToExchange: "connect-to-exchange",
  webpush: "webpush"
} as const;

type SETTING_KEY_VALUES = (typeof SETTING_KEY_VALUES)[keyof typeof SETTING_KEY_VALUES];

const UserSettings: FC = () => {
  const defaultPanel = PanelKeys.WEBPUSH;
  const defaultAccordianItem = SETTING_KEY_VALUES.webpush;
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [opened, setOpened] = useState(false);
  const isSignedIn = loading ? "" : Boolean(session?.user) ?? false;
  const [panel, setPanel] = useState<PanelKeys>(defaultPanel);

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
    switch (selectedMenuItem) {
      case SETTING_KEY_VALUES.connectToExchange: // Exchange Selection
        break;
      case SETTING_KEY_VALUES.webpush: // WebPush Menu Item
        setPanel(PanelKeys.WEBPUSH);
        if (isMobileUI()) {
          setOpened(true);
        }
        break;
      default:
        break;
    }
  };

  const PanelComponent = UserSettingsComponentMapping.get(panel);
  return (
    <>
      <DefaultLayout title="User setting" sidebar="" description="Update user profile">
        <div className="flex h-full w-full flex-1 flex-row overflow-auto rounded-lg bg-gray-300 sm:mb-1">
          <div className="dashboard-primary-panel overflow-y-auto">
            {!isSignedIn ? <h1 className="mb-2 text-2xl">Please Login.</h1> : null}
            <Accordion
              type="single"
              collapsible
              defaultValue={defaultAccordianItem}
              className="border-t-0 border-gray-400 p-2"
              onValueChange={onMenuItemClick}
            >
              <AccordionItem
                className="border-b border-t-0 border-gray-400 px-2 font-normal"
                value={SETTING_KEY_VALUES.connectToExchange}
              >
                <AccordionTrigger>
                  <h1 className="mb-2 text-2xl">
                    Connect <span className="font-semibold">Anavrin</span> to an exchange account.
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-md text-gray-600">
                    We currently only support Binance exchange.
                  </p>
                  <section className="my-4 grid grid-cols-4 gap-4">{Exchanges}</section>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value={SETTING_KEY_VALUES.webpush}
                className="border-b border-t-0 border-gray-400 px-2 font-normal"
              >
                <AccordionTrigger>
                  <h1 className="mb-2 text-2xl">Authorize webpush subscriptions.</h1>
                </AccordionTrigger>
              </AccordionItem>
            </Accordion>
          </div>
          <SecondaryPanel
            showDrawer={opened}
            setShowDrawer={setOpened}
            className="dashboard-secondary-panel m-2 border border-gray-400"
          >
            <PanelComponent />
          </SecondaryPanel>
        </div>
      </DefaultLayout>
    </>
  );
};

export default UserSettings;
