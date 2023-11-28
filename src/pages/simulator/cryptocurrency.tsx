import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import cn from "classnames";
import CryptocurrencySearchBox from "../../components/cryptocurrency-search-box";
import Ranker from "../../components/ranker";
import DefaultLayout from "../../layouts/default";
import { fetchCoinInfo } from "../../util/cryptocurrencyService";
import { createUrl } from "../../util/helper";
import VerticalRanker from "../../components/ranker/vertical-ranker";

const CoinInfo = ({ coin }) => (
  <div className="flex flex-col overflow-y-scroll bg-white p-4 shadow-md sm:flex-row">
    <div className="flex w-full flex-col justify-between rounded-lg bg-charcoal-900 p-4 text-gray-100 md:w-1/2">
      <div className="flex items-center py-2">
        <img className="mr-4 h-12 w-12 rounded-full" src={coin.image.large} alt={coin.name} />
        <div>
          <h2 className="text-lg font-medium">{coin.name}</h2>
          <p className="text-sm text-gray-300">{coin.symbol}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs">
        <div className="mr-4">
          <p className="text-xs text-gray-300">Market Cap</p>
          <p className="text-sm">{coin.market_data.market_cap.usd} $</p>
        </div>
        <div>
          <p className="text-xs text-gray-300">Total Volume</p>
          <p className="text-sm">{coin.market_data.total_volume.usd} $</p>
        </div>
      </div>
      <div className="mt-4 text-xs">
        <div className="flex justify-between">
          <div className="w-1/2 text-left text-gray-300">
            Current Price: {coin.market_data.current_price.usd} $
          </div>
          <div className="w-1/2 text-left text-gray-300">
            Change in 24h: {coin.market_data.price_change_percentage_24h} %
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          <div className="w-1/2 text-left  text-gray-300">
            High in 24h: {coin.market_data.high_24h.usd} $
          </div>
          <div className="w-1/2 text-left text-gray-300">
            Low in 24h: {coin.market_data.low_24h.usd} $
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg">
        <p className="py-2 text-sm font-medium">Categories:</p>
        <div className="flex flex-wrap">
          {coin.categories.map(category => (
            <span
              key={`cetegory-${category}`}
              className="mb-2 mr-2 rounded-lg bg-charcoal-300 p-2 text-xs font-medium"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-4 p-4">
      <p className="text-lg font-medium">Scores:</p>
      <div className="ml-4">
        <div className="flex justify-between border-b py-2">
          <span className="font-medium">Coingecko Score: </span>
          <span className="ml-2">{coin.coingecko_score}</span>
        </div>
        <div className="flex justify-between  border-b py-2">
          <span className="font-medium">Community Score: </span>
          <span className="ml-2">{coin.community_score}</span>
        </div>
        <div className="flex justify-between  border-b py-2">
          <span className="font-medium">Developer Score: </span>
          <span className="ml-2">{coin.developer_score}</span>
        </div>
        <div className="flex justify-between  border-b py-2">
          <span className="font-medium">Liquidity Score: </span>
          <span className="ml-2">{coin.liquidity_score}</span>
        </div>
        <div className="flex justify-between  py-2">
          <span className="font-medium">Public Interest Score: </span>
          <span className="ml-2">{coin.public_interest_score}</span>
        </div>
        <div className="flex justify-between  py-2">
          <span className="font-medium">Anavrin Score: </span>
          <span className="ml-2">{coin.anavrin_score}</span>
        </div>
      </div>
    </div>

    <div className="w-full rounded-lg bg-white p-4 md:w-1/4">
      <h3 className="text-lg font-medium">Status Updates</h3>
      <div className="h-64 overflow-y-auto">
        {coin.status_updates.map(update => (
          <div key={update.id} className="border-b border-gray-300 py-2">
            <div className="text-sm font-medium">{update.category}</div>
            <div className="text-xs">{update.created_at}</div>
            <div className="text-sm">{update.description}</div>
            <div className="text-xs font-medium">Pin: {update.pin ? "Yes" : "No"}</div>
            <div className="text-xs">{update.user}</div>
            <div className="text-xs font-medium">{update.user_title}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SimulatorCryptoCurrency: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [hide, setHide] = useState(false);

  const setSelectedCrypto = selectedCrypto => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (selectedCrypto) {
      newParams.set("q", selectedCrypto);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("cryptocurrency", newParams));
  };

  const selectedCrypto = searchParams.get("q") || "";
  const [coinInfo, setCoinInfo] = useState(undefined);
  const [cryptoWatchlist, setCryptoWatchlist] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (!selectedCrypto) {
        return;
      }
      const data = await fetchCoinInfo(selectedCrypto);
      setCoinInfo(data);

      const isSelectedCryptoInWatchlist = cryptoWatchlist.find(
        crypto => crypto.id === selectedCrypto
      );

      if (!isSelectedCryptoInWatchlist) {
        setCryptoWatchlist([...cryptoWatchlist, data]);
      }
    }
    fetchData();
  }, [cryptoWatchlist, selectedCrypto]);
  return (
    <>
      <DefaultLayout
        title="Simulator"
        sidebar="simulator"
        description="You can see your portfolios estimated value & progress below"
      >
        <div className="flex w-full flex-1 flex-row overflow-auto rounded-t-lg bg-gray-300">
          <div
            className={cn("w-full overflow-y-auto p-2 sm:w-8/12", {
              "sm:w-full": hide,
              "sm:w-8/12": !hide
            })}
          >
            <div className="bg-gray-200 p-6 shadow-md">
              {cryptoWatchlist ? (
                <CryptocurrencySearchBox
                  cyptocurrency={selectedCrypto}
                  setCyptocurrency={token => setSelectedCrypto(token)}
                />
              ) : null}
            </div>
            {selectedCrypto && coinInfo ? (
              <div className="flex-1 overflow-auto">
                <CoinInfo coin={coinInfo} />
              </div>
            ) : null}
            {/* <div className="bottom-0 h-20 border-t-2 border-charcoal-900">
              <Ranker items={cryptoWatchlist} />
            </div> */}
          </div>

          <div
            className={cn(
              "border-gray-400bg-charcoal-400 m-2 hidden overflow-auto rounded-lg bg-gray-200 p-2 text-gray-300 sm:block sm:w-4/12",
              {
                "sm:hidden sm:max-w-0": hide
              }
            )}
          >
            {/* Secondary Panel
            <LoremIpsum /> */}
            <VerticalRanker items={cryptoWatchlist} />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};
export default SimulatorCryptoCurrency;
