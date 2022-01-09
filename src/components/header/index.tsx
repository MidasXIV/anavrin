import { useSession } from "next-auth/client";
import { FC } from "react";
import { Menu, MenuItem, Divider, Text } from "@mantine/core";
import Link from "next/link";
import styles from "./index.module.css";

type HeaderProps = {
  title: string;
  description: string;
};

const Header: FC<HeaderProps> = ({ title, description }) => {
  const [session, loading] = useSession();
  const defaultUserImage =
    "//images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80";
  const userImage = loading ? defaultUserImage : session?.user?.image ?? defaultUserImage;

  return (
    <div className={`${styles.header} flex`}>
      <div className={styles.leftHeader}>
        <div className={`${styles.leftContentPanel} ${styles.content}`}>
          <h3 className="text-2xl font-black">{title}</h3>
          <p className="text-xs font-thin font-sans">{description}</p>
        </div>
      </div>
      <div className={styles.rightHeader}>
        <div className={`${styles.content} ${styles.rightContentPanel}`}>
          <Menu
            // trigger="hover"
            controlRefProp="ref"
            control={
              <button className="relative inline-block" type="button">
                <img
                  className="inline-block w-12 h-12 object-cover rounded-lg"
                  src={userImage}
                  alt="Profile"
                />
                <span className="absolute bottom-0 right-0 inline-block w-3 h-3 -mr-1 bg-green-600 border-2 border-white rounded-full" />
              </button>
            }
            menuPosition={{ top: 53, right: 0 }}
          >
            <MenuItem>
              <Link href="./user-settings">Settings</Link>
            </MenuItem>
            <MenuItem>
              <a href="./user-settings">Messages</a>
            </MenuItem>
            <MenuItem>Gallery</MenuItem>
            <MenuItem
              rightSection={
                <Text size="sm" color="gray">
                  ⌘K
                </Text>
              }
            >
              Search
            </MenuItem>
            <Divider />
            <MenuItem disabled>Delete my data</MenuItem>
            <MenuItem color="red">Delete account</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
