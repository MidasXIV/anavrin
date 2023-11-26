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
    <header className="box-border flex border px-10 py-12 lg:px-56">
      <div className="mr-auto">
        <h3 className="text-xl">{title}</h3>
        <p className="my-4 max-w-xs text-sm">{description}</p>
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
            <Link href={currentPage.path}>{currentPage.label}</Link>
            <>
              {otherPages.map(page => (
                <Link href={page.path} key={page.path + page.label}>
                  {page.label}
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
