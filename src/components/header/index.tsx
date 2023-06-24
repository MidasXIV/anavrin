import { useSession, signIn, signOut } from "next-auth/react";
import { FC } from "react";
import { Menu, Divider, Text } from "@mantine/core";
import Link from "next/link";
import cn from "classnames";
import Image from "next/image";
import styles from "./index.module.css";

type HeaderProps = {
  title: string;
  description: string;
};

const Header: FC<HeaderProps> = ({ title, description }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const defaultUserImage =
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80";
  const userImage = loading ? defaultUserImage : session?.user?.image ?? defaultUserImage;

  return (
    <div className={cn(styles.header, "flex")}>
      <div className={styles.leftHeader}>
        <div className={cn(styles.leftContentPanel, styles.content)}>
          <h3 className="text-2xl font-black">{title}</h3>
          <p className="font-sans text-xs font-thin">{description}</p>
        </div>
      </div>
      <div className={styles.rightHeader}>
        <div className={cn(styles.content, styles.rightContentPanel)}>
          <Menu
            // trigger="hover"
            width={200}
            position="top-end"
            offset={6}
          >
            <Menu.Target>
            <button className="relative inline-block" type="button">
                <Image
                  className="inline-block h-12 w-12 rounded-lg object-cover"
                  src={userImage}
                  alt="Profile"
                  layout="intrinsic"
                  width={48}
                  height={48}
                />
                <span className="absolute bottom-0 right-0 -mr-1 inline-block h-3 w-3 rounded-full border-2 border-white bg-green-600" />
              </button>
            </Menu.Target>
            <Menu.Dropdown>

            <Menu.Item>
              <Link href="./user-settings">Settings</Link>
            </Menu.Item>
            <Menu.Item>
              <a href="./user-settings">Messages</a>
            </Menu.Item>
            <Menu.Item>Gallery</Menu.Item>
            <Menu.Item
              rightSection={
                <Text size="sm" color="gray">
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item>
            <Divider />
            <Menu.Item disabled>Delete my data</Menu.Item>
            {session ? (
              <Menu.Item color="red" onClick={() => signOut()}>
                Sign out
              </Menu.Item>
            ) : (
              <Menu.Item color="green" onClick={() => signIn()}>
                Sign in
              </Menu.Item>
            )}
                  </ Menu.Dropdown>

          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
