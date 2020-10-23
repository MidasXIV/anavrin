import { useState, FC } from "react";
import Link from "next/link";
import DropdownMenu from "../dropdown-menu";
import Menu from "../menu";

type Page = {
  label: string;
  path: string;
};

type AppHeaderProps = {
  title: string;
  description: string;
  currentPage: Page;
  otherPages: Page[];
};

const AppHeader: FC<AppHeaderProps> = ({ title, description, currentPage, otherPages }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <header className="flex px-10 py-12 lg:px-56 box-border border">
      <div className="mr-auto">
        <h3 className="text-xl">{title}</h3>
        <p className="my-4 text-sm max-w-xs">{description}</p>
      </div>
      <DropdownMenu
        button={
          <button onClick={() => setMenuOpened(!menuOpened)} type="button" className="h-12">
            {currentPage.label}
            {"  "}↓
          </button>
        }
        menu={
          <Menu onOutsideClick={() => setMenuOpened(false)} style={{ top: "2.5rem" }}>
            <Link href={currentPage.path}>
              <a>{currentPage.label}</a>
            </Link>
            <>
              {otherPages.map(page => (
                <Link href={page.path} key={page.path + page.label}>
                  <a>{page.label}</a>
                </Link>
              ))}
            </>
          </Menu>
        }
        opened={menuOpened}
      />
    </header>
  );
};

export default AppHeader;
