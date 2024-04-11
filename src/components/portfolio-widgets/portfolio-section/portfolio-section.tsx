import PortfolioOverviewCard from "@/components/portfolio-overview-card/portfolio-overview-card";
import { AssetType } from "lib/portfolio-utils";
import AlertWrapper from "@/components/alert/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import AddNewAssetPortfolioCard from "../add-new-asset-portfolio-card";

const PortfolioSection = ({
  title,
  assetType,
  portfolios,
  setSelectedPortfolio,
  handleAssetTypeSelection
}) => (
  <article className="mb-6">
    <h1 className="mb-4 text-3xl font-semibold">{title}</h1>
    <div className="grid auto-cols-[250px] grid-flow-col gap-5 overflow-x-auto p-2">
      {portfolios
        .filter(portfolio => portfolio.assetType === assetType)
        .map(portfolio => (
          <PortfolioOverviewCard
            key={portfolio._id}
            portfolio={portfolio}
            onPortfolioSelect={setSelectedPortfolio}
            variant="compact"
          />
        ))}
      <AddNewAssetPortfolioCard
        handleAssetTypeSelection={() => handleAssetTypeSelection(assetType, [])}
      />
    </div>
  </article>
);

const PortfolioSections = ({ portfolios, setSelectedPortfolio, handleAssetTypeSelection }) => (
  <>
    {portfolios?.length < 1 ? (
      <AlertWrapper
        icon={<ExclamationTriangleIcon className="h-4 w-4" />}
        title="Welcome to your portfolio page!"
        description={`It looks like you don't have any portfolios yet. Don't worry, you can easily
        create a new portfolio by clicking on the 'Create New Portfolio' button below. Once you have created a portfolio, you can track your investments, view your
        estimated portfolio value, and monitor your progress. Start building your portfolio today!`}
      />
    ) : null}
    <section className="h-full overflow-auto p-2">
      <PortfolioSection
        title="Crypto"
        assetType={AssetType.CRYPTO}
        portfolios={portfolios}
        setSelectedPortfolio={setSelectedPortfolio}
        handleAssetTypeSelection={handleAssetTypeSelection}
      />
      <PortfolioSection
        title="Stock"
        assetType={AssetType.STOCK}
        portfolios={portfolios}
        setSelectedPortfolio={setSelectedPortfolio}
        handleAssetTypeSelection={handleAssetTypeSelection}
      />
      <PortfolioSection
        title="Dubai Financial market"
        assetType={AssetType.DFM}
        portfolios={portfolios}
        setSelectedPortfolio={setSelectedPortfolio}
        handleAssetTypeSelection={handleAssetTypeSelection}
      />
    </section>
  </>
);

export default PortfolioSections;
