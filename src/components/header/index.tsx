import { FC } from "react";
import styles from "./index.module.css";

type HeaderProps = {
  title?: string;
};

const Header: FC<HeaderProps> = () => {
  return (
    <div className={styles.header}>
      <div className={styles.leftHeader}>
        <div className={styles.content}>
          <h4>Anavrin</h4>
        </div>
      </div>
      <div className={styles.rightHeader}>
        <div className={styles.content}>Sign out</div>
      </div>
    </div>
  );
};

export default Header;
