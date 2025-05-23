import { FC } from "react";
import { clsx } from "clsx";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import useModal from "hooks/useModal";
import NotYetImplementedModal from "@/components/feature-not-implemented-modal";
import styles from "./index.module.css";
import TooltipWrapper from "../tooltip-wrapper";

// FIXME: Heavily redacted to stick to MVP

type SidebarProps = {
  select: string;
};

const Sidebar: FC<SidebarProps> = ({ select }) => {
  const { isShowing: showNotYetImplementedModal, toggle: toggleShowNotYetImplementedModal } =
    useModal(false);
  return (
    <nav className={clsx(styles.sidebar, "flex font-sans")}>
      {showNotYetImplementedModal ? (
        <NotYetImplementedModal
          isShowing={showNotYetImplementedModal}
          cancel={toggleShowNotYetImplementedModal}
        />
      ) : null}
      <div className="flex h-auto w-full flex-row justify-between sm:h-full sm:w-auto sm:flex-col">
        <ul className="nav flex flex-col border-r border-gray-900 sm:border-b">
          <TooltipWrapper color="orange" label="overview">
            <li
              className={clsx(styles.icon, { [styles.active]: select === "overview" })}
              // TODO: remove modal when implemented, not intended for MVP
              onClick={toggleShowNotYetImplementedModal}
            >
              {/* <Link href="/overview"> */}
              <svg
                className="bi bi-view-list icon"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4.5h10a2 2 0 012 2v3a2 2 0 01-2 2H3a2 2 0 01-2-2v-3a2 2 0 012-2zm0 1a1 1 0 00-1 1v3a1 1 0 001 1h10a1 1 0 001-1v-3a1 1 0 00-1-1H3zM1 2a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13A.5.5 0 011 2zm0 12a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13A.5.5 0 011 14z"
                  clipRule="evenodd"
                />
              </svg>
              {/* </Link> */}
            </li>
          </TooltipWrapper>
        </ul>

        <ul className="nav flex flex-row sm:flex-col">
          <TooltipWrapper color="orange" label="dashboard">
            <li className={clsx(styles.icon, { [styles.active]: select === "dashboard" })}>
              <Link href="/dashboard">
                <svg
                  className="bi bi-house icon"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 13.5V7h1v6.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V7h1v6.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5zm11-11V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.293 1.5a1 1 0 011.414 0l6.647 6.646a.5.5 0 01-.708.708L8 2.207 1.354 8.854a.5.5 0 11-.708-.708L7.293 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </li>
          </TooltipWrapper>
          <TooltipWrapper color="orange" label="portfolio">
            <li className={clsx(styles.icon, { [styles.active]: select === "portfolio" })}>
              <Link href="/portfolio">
                <svg
                  className="bi bi-bullseye icon"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8 13A5 5 0 108 3a5 5 0 000 10zm0 1A6 6 0 108 2a6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8 11a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 100-8 4 4 0 000 8z"
                    clipRule="evenodd"
                  />
                  <path d="M9.5 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </Link>
            </li>
          </TooltipWrapper>
          <TooltipWrapper color="orange" label="analysis">
            <li
              className={clsx(styles.icon, { [styles.active]: select === "simulator" })}
              // TODO: remove modal when implemented, not intended for MVP
              // onClick={toggleShowNotYetImplementedModal}
            >
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <svg
                    className="bi bi-collection icon"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.5 13.5h-13A.5.5 0 011 13V6a.5.5 0 01.5-.5h13a.5.5 0 01.5.5v7a.5.5 0 01-.5.5zm-13 1A1.5 1.5 0 010 13V6a1.5 1.5 0 011.5-1.5h13A1.5 1.5 0 0116 6v7a1.5 1.5 0 01-1.5 1.5h-13zM2 3a.5.5 0 00.5.5h11a.5.5 0 000-1h-11A.5.5 0 002 3zm2-2a.5.5 0 00.5.5h7a.5.5 0 000-1h-7A.5.5 0 004 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full" align="center" side="right" sideOffset={25}>
                  {/* <DropdownMenuItem asChild>
                    <Link
                      className="w-full hover:cursor-pointer"
                      href="/simulator/dubai-financial-markets"
                    >
                      DFM
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link className="w-full hover:cursor-pointer" href="/simulator/cryptocurrency">
                      Crypto
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator /> */}
                  <DropdownMenuItem>
                    <Link className="w-full hover:cursor-pointer" href="/simulator/backtest">
                      Backtest
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </TooltipWrapper>
        </ul>

        <ul className="nav flex flex-row sm:flex-col">
          <TooltipWrapper color="orange" label="change log">
            <li
              className={clsx(styles.icon, { [styles.active]: select === "news" })}
              // TODO: remove modal when implemented, not intended for MVP
              onClick={toggleShowNotYetImplementedModal}
            >
              {/* <Link href="/register"> */}
              <svg
                className="bi bi-file-earmark-text icon"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z" />
                <path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z" />
                <path
                  fillRule="evenodd"
                  d="M5 11.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm0-2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0-2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z"
                  clipRule="evenodd"
                />
              </svg>
              {/* </Link> */}
            </li>
          </TooltipWrapper>
        </ul>
      </div>
    </nav>
  );
};
export default Sidebar;
