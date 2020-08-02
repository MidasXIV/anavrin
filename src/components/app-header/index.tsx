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
    <header>
      <div className="intro">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <DropdownMenu
        button={
          <button onClick={() => setMenuOpened(!menuOpened)} type="button">
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

      <style jsx>{`
        header {
          display: flex;
        }

        header button {
          height: 3rem;
        }

        .intro {
          margin-right: auto;
          max-width: 25rem;
        }

        p {
          margin: 1rem 0;
        }
      `}</style>
    </header>
  );
};

export default AppHeader;
