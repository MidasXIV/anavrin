import { useState } from "react";
import { DropdownMenu, Menu } from "..";
import Link from "next/link";

export default function AppHeader({
  title,
  description,
  currentPage,
  otherPages,
}) {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <header>
      <div className="intro">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <DropdownMenu
        button={
          <button onClick={() => setMenuOpened(!menuOpened)}>
            {currentPage.label}
            {"  "}↓
          </button>
        }
        menu={
          <Menu
            onOutsideClick={() => setMenuOpened(false)}
            style={{ top: "2.5rem" }}
          >
            <Link href={currentPage.path}>
              <a>{currentPage.label}</a>
            </Link>
            {otherPages.map((page) => (
              <Link href={page.path}>
                <a>{page.label}</a>
              </Link>
            ))}
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
}
