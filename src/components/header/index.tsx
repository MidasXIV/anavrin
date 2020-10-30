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
        {/* <div className={`${styles.content} ${styles.rightBtnPanel}`}> */}
        <div className={`${styles.content} ${styles.rightContentPanel}`}>
          <button className="relative inline-block" type="button">
            <img
              className="inline-block w-10 h-10 object-cover rounded-lg"
              src="//images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
              alt="Profile"
            />
            <span className="absolute bottom-0 right-0 inline-block w-3 h-3 -mr-1 bg-green-600 border-2 border-white rounded-full" />
          </button>
          {/* <div className="flex flex-row justify-around w-full h-full">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
