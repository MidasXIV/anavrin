import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import BacktestConfiguration from "@/components/backtest-components/backtest-configuration/backtest-configuration";
import BacktestAnalysis from "@/components/backtest-components/backtest-analysis/backtest-analysis";
import { Button } from "@/components/ui/button";
import { gunzipSync, gzipSync } from "zlib";
import isEmptyDataItem from "@/utils/type-gaurds";
import DefaultLayout from "../../layouts/default";
import { createUrl } from "../../utils/helper";

const SimulatorBacktest: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);

  const [configuration, setConfiguration] = useState(undefined);
  const [analysisData, setAnalysisData] = useState<BacktestAnalyzeDTO>(undefined);

  useEffect(() => {
    setLoading(true);
    if (!router.isReady) return;

    const storedData = searchParams.get("q") || "";
    if (storedData) {
      const buffer = Buffer.from(storedData, "base64");
      const inflatedBuffer = gunzipSync(buffer);
      const decompressedString = inflatedBuffer.toString("utf8");
      const data = JSON.parse(decompressedString);
      console.log(data);
      if (!isEmptyDataItem(data.configuration)) {
        setConfiguration(data.configuration);
      }
      if (!isEmptyDataItem(data.analysisData)) {
        setAnalysisData(data.analysisData);
      }
    }
    setLoading(false);
  }, [router.isReady, searchParams]);

  return (
    <>
      <DefaultLayout
        title="Backtest"
        sidebar="simulator"
        description="Backtest portfolios with benchmark"
      >
        <div className="flex h-full w-full flex-1 flex-row overflow-hidden rounded-xl bg-gray-300 sm:mb-1 sm:mr-1 sm:rounded-lg">
          <div
            // className={clsx("w-full overflow-y-auto p-2 sm:w-8/12", {
            className={clsx("flex h-full w-full flex-col space-y-2 overflow-y-auto p-2")}
          >
            {loading === false ? (
              <>
                <div className="rounded-lg border-gray-400 bg-gray-200 p-2">
                  <h1 className="w-full border-b-2 border-gray-300 p-2 text-center text-xl font-light">
                    Backtest configuration
                  </h1>
                  <BacktestConfiguration
                    defaultConfiguration={configuration}
                    setAnalysisData={setAnalysisData}
                    setConfiguration={setConfiguration}
                  />
                </div>

                {analysisData ? (
                  <>
                    <div className="min-h-fit rounded-lg border-gray-400 bg-gray-200 p-2">
                      <h1 className="w-full border-b-2 border-gray-300 p-2 text-center text-xl font-light">
                        Backtest Analysis
                      </h1>
                      <BacktestAnalysis analysisData={analysisData} />
                    </div>
                    <div className="rounded-lg border-gray-400 bg-gray-200 p-2">
                      <Button
                        type="button"
                        className="mt-4 w-full p-2 font-thin"
                        onClick={() => {
                          const compressedString = gzipSync(
                            JSON.stringify({
                              configuration,
                              analysisData
                            })
                          ).toString("base64");
                          console.log(compressedString);
                          const newParams = new URLSearchParams(searchParams.toString());

                          if (compressedString) {
                            newParams.set("q", compressedString);
                          } else {
                            newParams.delete("q");
                          }
                          router.push(createUrl("backtest", newParams));
                        }}
                      >
                        Save analysis
                      </Button>
                    </div>
                  </>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};
export default SimulatorBacktest;
