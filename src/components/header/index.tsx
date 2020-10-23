import { FC } from "react";
import styles from "./index.module.css";

type HeaderProps = {
  title: string;
  description: string;
};

const Header: FC<HeaderProps> = ({ title, description }) => {
  return (
    <div className={styles.header}>
      <div className={styles.leftHeader}>
        <div className={`${styles.leftContentPanel} ${styles.content}`}>
          <h3 className="text-2xl font-black">{title}</h3>
          <p className="text-xs font-thin font-sans">{description}</p>
        </div>
      </div>
      <div className={styles.rightHeader}>
        <div className={`${styles.content} ${styles.rightBtnPanel}`}>
          <div className="flex flex-row justify-around w-full h-full">
            <button type="button" className={styles.headerBtn}>
              Account
            </button>
            <button type="button" className={styles.headerBtn}>
              Sign out
            </button>
            <button type="button" className={styles.headerBtn}>
              Sign out
            </button>
          </div>

          <div className="flex flex-row justify-around w-full h-full">
            <button type="button" className={styles.headerBtn}>
              Account
            </button>
            <button type="button" className={styles.headerBtn}>
              Sign out
            </button>
            <button type="button" className={styles.headerBtn}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
