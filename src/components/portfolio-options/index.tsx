import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
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
  <div className="flex h-full flex-row items-center justify-between rounded-lg bg-charcoal-900 p-4 align-middle sm:px-4 sm:py-0">
    <ul className="nav flex flex-row">
      <TooltipWrapper label="Add stock" color="orange">
        <button type="button" className={styles.icon} onClick={openAddAssetModal}>
          <PlusIconSVG width={24} height={24} />
        </button>
      </TooltipWrapper>
    </ul>

    <ul className="nav flex flex-row space-x-5 xl:flex">
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
    <ul className="nav flex flex-row xl:flex">
      <TooltipWrapper label="Analyse portfolio" color="orange">
        <button type="button" className={styles.icon} onClick={togglePortfolioAnalysisPanel}>
          <AnalyseIcon width={24} height={24} />
        </button>
      </TooltipWrapper>
    </ul>
    {/* Options */}
    <ul className="nav hidden flex-row xl:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className={styles.icon}>
            <MoreOptionsIcon width={32} height={32} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full" align="end" side="bottom" sideOffset={6}>
          <DropdownMenuItem
            color="orange"
            onClick={savePortfolio}
            className="inline-flex w-full justify-between hover:cursor-pointer"
          >
            <SaveIcon width={15} height={15} />
            <span className="px-2">Save</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            color="red"
            onClick={deletePortfolio}
            className="inline-flex w-full justify-between hover:cursor-pointer"
          >
            <DeletePortfolioIcon width={15} height={15} />
            <span className="px-2">Delete</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            color="green"
            onClick={togglePortfolioAnalysisPanel}
            className="inline-flex w-full justify-between hover:cursor-pointer"
          >
            <AnalyseIcon width={15} height={15} />
            <span className="px-2">Analyse</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ul>
  </div>
);

export default PortfolioOptions;
