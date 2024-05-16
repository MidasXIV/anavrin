import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { Drawer } from "vaul";
import BacktestConfiguration from "@/components/backtest-components/backtest-configuration/backtest-configuration";
import BacktestPortfolio from "@/components/backtest-components/backtest-portfolio/backtest-portfolio";
import BacktestAnalysis from "@/components/backtest-components/backtest-analysis/backtest-analysis";
import CryptocurrencySearchBox from "../../components/cryptocurrency-search-box";
import Ranker from "../../components/ranker";
import DefaultLayout from "../../layouts/default";
import { fetchCoinInfo } from "../../utils/cryptocurrencyService";
import { createUrl } from "../../utils/helper";
import VerticalRanker from "../../components/ranker/vertical-ranker";

const SimulatorBacktest: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [hide, setHide] = useState(false);

  // const setSelectedCrypto = selectedCrypto => {
  //   const newParams = new URLSearchParams(searchParams.toString());

  //   if (selectedCrypto) {
  //     newParams.set("q", selectedCrypto);
  //   } else {
  //     newParams.delete("q");
  //   }

  //   router.push(createUrl("cryptocurrency", newParams));
  // };

  // const selectedCrypto = searchParams.get("q") || "";
  // const [coinInfo, setCoinInfo] = useState(undefined);
  // const [cryptoWatchlist, setCryptoWatchlist] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     if (!selectedCrypto) {
  //       return;
  //     }
  //     const data = await fetchCoinInfo(selectedCrypto);
  //     setCoinInfo(data);

  //     const isSelectedCryptoInWatchlist = cryptoWatchlist.find(
  //       crypto => crypto.id === selectedCrypto
  //     );

  //     if (!isSelectedCryptoInWatchlist) {
  //       setCryptoWatchlist([...cryptoWatchlist, data]);
  //     }
  //   }
  //   fetchData();
  // }, [cryptoWatchlist, selectedCrypto]);

  const [analysisData, setAnalysisData] = useState<BacktestAnalyzeDTO>(undefined);

  return (
    <>
      <DefaultLayout
        title="Backtest"
        sidebar="simulator"
        description="Backtest portfolios with benchmark"
      >
        <div className="flex w-full flex-1 flex-col overflow-auto  rounded-t-lg bg-gray-300 md:flex-row">
          {/* Left hand panel */}
          <div
            // className={clsx("w-full overflow-y-auto p-2 sm:w-8/12", {
            className={clsx("flex h-full w-full flex-col space-y-2 overflow-y-auto p-2", {
              "sm:w-full": hide
              // "sm:w-8/12": !hide
            })}
          >
            <div className="rounded-lg border-gray-400 bg-gray-200 p-2">
              <h1 className="w-full border-b-2 border-gray-300 p-2 text-center text-xl font-light">
                Backtest configuration
              </h1>
              <BacktestConfiguration setAnalysisData={setAnalysisData} />
            </div>

            {analysisData ? (
              <div className="rounded-lg border-gray-400 bg-gray-200 p-2 min-h-fit">
                <h1 className="w-full border-b-2 border-gray-300 p-2 text-center text-xl font-light">
                  Backtest Analysis
                </h1>
                <BacktestAnalysis analysisData={analysisData} />
              </div>
            ) : null}
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};
export default SimulatorBacktest;
