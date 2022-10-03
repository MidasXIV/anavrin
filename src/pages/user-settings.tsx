import { FC, useState } from "react";
import { Accordion, Divider, Drawer } from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";
import DefaultLayout from "../layouts/default";
import * as exchanges from "../components/exchanges-form";
import ExchangeFormFactory from "../components/exchange-form-factory";
import { isMobileUI } from "../lib/viewport";
import WebPushSubscription from "../components/webpush-subscription";
import PushNotificationPanel from "../components/push-notification-panel";

const Overview: FC = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [opened, setOpened] = useState(false);
  const isSignedIn = loading ? "" : Boolean(session?.user) ?? false;
  const [exchangeKey, exchangeKeyPanel] = useState<exchanges.ExchangeKeys>(null);

  const onExchangeButtonClick = (exchange: exchanges.ExchangeKeys) => {
    // Pass in the exchange name which can be understood by the Form Factory.
    // sets the secondary Panel.
    exchangeKeyPanel(exchange);
    // Only in Mobile UI should the Secondary Panel as a drawer.
    if (isMobileUI()) {
      setOpened(true);
    }
  };

  const Exchanges = exchanges.list.map(exchange =>
    // eslint-disable-next-line import/namespace
    exchanges[exchange]({ onClick: onExchangeButtonClick })
  );

  return (
    <>
      <DefaultLayout title="User setting" sidebar="" description="Update user profile">
        <div className="w-full h-full flex flex-row">
          <div className="dashboard-primary-panel">
            {!isSignedIn ? <h1 className="text-2xl mb-2">Please Login.</h1> : null}
            <Accordion initialItem={-1} className="border-t-0 border-b border-gray-400">
              <Accordion.Item
                className="font-normal border-t-0 border-b border-gray-400"
                label={
                  <h1 className="text-2xl mb-2">
                    Connect <span className="font-semibold">Anavrin</span> to an exchange account.
                  </h1>
                }
              >
                <p className="text-md text-gray-600">We currently only support Binance exchange.</p>
                <section className="grid grid-cols-4 gap-4 my-4">{Exchanges}</section>
              </Accordion.Item>
              <Accordion.Item
                label={<h1 className="text-2xl mb-2">Authorize webpush subscriptions.</h1>}
              />
            </Accordion>
            
          </div>
          <div className="dashboard-secondary-panel">
            <ExchangeFormFactory exchange={exchangeKey} />
            <PushNotificationPanel />
            <Drawer
              opened={opened}
              onClose={() => setOpened(false)}
              title="Register"
              padding="xl"
              size="xl"
            >
              <ExchangeFormFactory exchange={exchangeKey} />
            </Drawer>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Overview;
