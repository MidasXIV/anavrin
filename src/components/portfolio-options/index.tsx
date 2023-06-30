import { FC } from "react";
import { Divider, Menu } from "@mantine/core";
import styles from "./index.module.css";
import TooltipWrapper from "../tooltip-wrapper";
import AnalyseIcon from "../icons/analyseIcon";
import SaveIcon from "../icons/saveIcon";
import DeletePortfolioIcon from "../icons/DeletePortfolioIcon";
import PlusIconSVG from "../icons/plusIconSVG";
import MoreOptionsIcon from "../icons/moreOptionsIcon";

type PortfolioOptionsProps = {
  openAddAssetModal: () => void;
  savePortfolio: () => void;
  deletePortfolio: () => void;
  togglePortfolioAnalysisPanel: () => void;
};

// TODO: Take in schema and generate layout based on Schema
// Solves hardcoding buttons and their functionality.

const PortfolioOptions: FC<PortfolioOptionsProps> = ({
  openAddAssetModal,
  savePortfolio,
  deletePortfolio,
  togglePortfolioAnalysisPanel
}) => (
  <div className="flex h-full flex-row items-center justify-between rounded-lg bg-charcoal-900 px-4 align-middle">
    <ul className="nav flex flex-row">
      <TooltipWrapper label="Add stock" color="orange">
        <button type="button" className={styles.icon} onClick={openAddAssetModal}>
          <PlusIconSVG width={24} height={24} />
        </button>
      </TooltipWrapper>
    </ul>

    <ul className="nav hidden flex-row space-x-5 xl:flex">
      <TooltipWrapper label="Delete" color="orange">
        <button type="button" className={styles.icon} onClick={deletePortfolio}>
          <DeletePortfolioIcon width={24} height={24} />
        </button>
      </TooltipWrapper>
      <TooltipWrapper label="Save" color="orange">
        <button type="button" className={styles.icon} onClick={savePortfolio}>
          <SaveIcon width={24} height={24} />
        </button>
      </TooltipWrapper>
    </ul>

    {/* Transistion panel -> Open portfolio analysis panel */}
    <ul className="nav hidden flex-row xl:flex">
      <TooltipWrapper label="Analyse portfolio" color="orange">
        <button type="button" className={styles.icon} onClick={togglePortfolioAnalysisPanel}>
          <AnalyseIcon width={24} height={24} />
        </button>
      </TooltipWrapper>
    </ul>
    {/* Options */}
    <ul className="nav flex flex-row xl:hidden">
      <Menu
        // trigger="hover"
        width={200}
        position="bottom-end"
        offset={6}
      >
        <Menu.Target>
          <button type="button" className={styles.icon}>
            <MoreOptionsIcon width={32} height={32} />
          </button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            color="orange"
            icon={<SaveIcon width={15} height={15} />}
            onClick={savePortfolio}
          >
            Save
          </Menu.Item>
          <Menu.Item
            color="red"
            icon={<DeletePortfolioIcon width={15} height={15} />}
            onClick={deletePortfolio}
          >
            Delete
          </Menu.Item>
          <Divider />
          <Menu.Item
            color="green"
            icon={<AnalyseIcon width={15} height={15} />}
            onClick={togglePortfolioAnalysisPanel}
          >
            Analyse
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </ul>
  </div>
);

export default PortfolioOptions;
