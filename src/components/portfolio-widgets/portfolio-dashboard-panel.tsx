import EconomicEventsPanel from "../economic-events-panel";
import PortfolioDiversificationCard from "../portfolio-diversification-card/portfolio-diversification-card";
import Card from "./Card/card";

const PortfolioDashboardPanel = ({ portfolios }) => (
  <section className="h-3/5 w-full overflow-hidden p-2">
    <div className="flex h-full w-full flex-row rounded-xl border border-gray-400 bg-gray-200 p-2">
      <div className="h-full w-2/5 p-1">
        <Card showHeader headerTitle="Portfolios breakdown">
          <div className="h-full w-full" />
        </Card>
      </div>
      <div className="flew-row flex flex-1">
        <div className="h-full w-1/2  border-gray-400">
          <div className="h-1/2 w-full p-1">
            <Card showHeader headerTitle="Portfolios breakdown">
              <div className="h-full w-full">
                <PortfolioDiversificationCard portfolios={portfolios} />
              </div>
            </Card>
          </div>
          <div className="h-1/2 w-full  border-gray-400 p-1">
            <Card showHeader headerTitle="Portfolios breakdown">
              <div className="h-full w-full" />
            </Card>
          </div>
        </div>
        <div className="h-full w-1/2  border-gray-400">
          {/* <div className="h-1/2 w-full p-1">
                    <Card showHeader headerTitle="Portfolios breakdown">
                      <div className="h-full w-full" />
                    </Card>
                  </div> */}
          <div className="h-full w-full border-gray-400 p-1">
            <Card showHeader headerTitle="Economic events">
              <div className="h-full w-full overflow-auto">
                <EconomicEventsPanel variant="compact" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PortfolioDashboardPanel;
