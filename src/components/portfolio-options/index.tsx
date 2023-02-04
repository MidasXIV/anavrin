import { FC } from "react";
import cn from "classnames";
import { Tooltip } from "@mantine/core";
import styles from "./index.module.css";
import TooltipWrapper from "../tooltip-wrapper";

type PortfolioOptionsProps = {
  openAddStockModal: () => void;
  togglePortfolioAnalysisPanel: () => void;
};

// TODO: Take in schema and generate layout based on Schema
// Solves hardcoding buttons and their functionality.

const PortfolioOptions: FC<PortfolioOptionsProps> = ({
  openAddStockModal,
  togglePortfolioAnalysisPanel
}) => (
  <div className="flex h-full flex-row items-center justify-between rounded-lg bg-charcoal-900 px-4 align-middle">
    <ul className="nav flex flex-row">
      <TooltipWrapper label="Add stock" color="orange">
        <button type="button" className={styles.icon} onClick={openAddStockModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </TooltipWrapper>
    </ul>

    <ul className="nav hidden flex-row space-x-5 xl:flex">
      <TooltipWrapper label="Delete" color="orange">
        <button type="button" className={styles.icon}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </TooltipWrapper>
      <TooltipWrapper label="Add stock" color="orange">
        <button type="button" className={styles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
            />
          </svg>
        </button>
      </TooltipWrapper>
    </ul>

    {/* Transistion panel -> Open portfolio analysis panel */}
    <ul className="nav hidden flex-row xl:flex">
      <TooltipWrapper label="Analyse portfolio" color="orange">
        <button type="button" className={styles.icon} onClick={togglePortfolioAnalysisPanel}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.81812 4.68161C4.99386 4.85734 4.99386 5.14227 4.81812 5.318L3.08632 7.0498H11.9135L10.1817 5.318C10.006 5.14227 10.006 4.85734 10.1817 4.68161C10.3575 4.50587 10.6424 4.50587 10.8181 4.68161L13.3181 7.18161C13.4939 7.35734 13.4939 7.64227 13.3181 7.818L10.8181 10.318C10.6424 10.4937 10.3575 10.4937 10.1817 10.318C10.006 10.1423 10.006 9.85734 10.1817 9.68161L11.9135 7.9498H3.08632L4.81812 9.68161C4.99386 9.85734 4.99386 10.1423 4.81812 10.318C4.64239 10.4937 4.35746 10.4937 4.18173 10.318L1.68173 7.818C1.50599 7.64227 1.50599 7.35734 1.68173 7.18161L4.18173 4.68161C4.35746 4.50587 4.64239 4.50587 4.81812 4.68161Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </TooltipWrapper>
    </ul>
    {/* Options */}
    <ul className="nav flex flex-row xl:hidden">
      <button type="button" className={styles.icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </button>
    </ul>
  </div>
);

export default PortfolioOptions;
