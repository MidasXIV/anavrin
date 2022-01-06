import { FC, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import DefaultLayout from "../layouts/default";
import * as exchanges from "../components/exchanges-form";
import ExchangeFormFactory from "../components/exchange-form-factory";

const Overview: FC = () => {
  const [session, loading] = useSession();
  const isSignedIn = loading ? "" : Boolean(session?.user) ?? false;
  const [exchangeKey, exchangeKeyPanel] = useState<exchanges.ExchangeKeys>(null);

  const onExchangeButtonClick = (exchange: exchanges.ExchangeKeys) => {
    // Pass in the exchange name which can be understood by the Form Factory.
    // sets the secondary Panel.
    exchangeKeyPanel(exchange);
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
            <h1 className="text-2xl mb-2">
              Connect <span className="font-semibold">Anavrin</span> to an exchange account.
            </h1>
            <p className="text-md text-gray-600">We currently only support Binance exchange.</p>
            <section className="grid grid-cols-4 gap-4 my-4">{Exchanges}</section>
          </div>
          <div className="dashboard-secondary-panel">
            <ExchangeFormFactory exchange={exchangeKey} />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Overview;
