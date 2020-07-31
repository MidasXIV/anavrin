import { useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import { DropdownMenu, Menu } from "../components";

export default function Home() {
  const [session, loading] = useSession();
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <main>
      <header>
        <a href="#about">
          <h4 className="logo">Anavrin</h4>
        </a>

        <nav className="links">
          <a href="#about" className="mr-1">
            About
          </a>
          <a href="#support" className="mr-1">
            Support
          </a>
          {session ? (
            <DropdownMenu
              button={
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  onClick={() => setMenuOpened(!menuOpened)}
                  onKeyUp={(e) => {
                    if (e.keyCode === 32) setMenuOpened(!menuOpened);
                  }}
                  className="avatar"
                  tabIndex={0}
                />
              }
              menu={
                <Menu onOutsideClick={() => setMenuOpened(false)}>
                  <Link href="/dashboard">
                    <a>Dashboard</a>
                  </Link>
                  <button className="unstyled" onClick={signOut}>
                    Sign Out
                  </button>
                </Menu>
              }
              opened={menuOpened}
            />
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </nav>
      </header>
      <div className="landing">
        <h1>
          Simple tracking & simulation for your portfolio. Make better decisions
          with real data.
        </h1>
        <div className="landing-buttons">
          <button className="mr-half">
            {session ? "Go to dashboard" : "Sign Up"}
          </button>
          <button className="ghost">Learn More</button>
        </div>
      </div>

      <style jsx>{`
        .landing {
          max-width: 47.5rem;
          padding: 15% 5%;
        }

        @media (max-width: 768px) {
          .landing {
            width: 100%;
          }
        }

        header {
          display: flex;
          align-items: center;
        }

        header nav {
          margin-left: auto;
          display: flex;
          align-items: center;
        }

        .landing-buttons {
          display: flex;
          align-items: center;
          margin-top: 2.5rem;
        }

        .avatar {
          width: 2.5rem;
          border-radius: 50%;
        }
      `}</style>
    </main>
  );
}

/*

  --- Sketching out the structure of the app ---

  index.js => landing page where users can login (will be only one page with sections)
  dashboard.js => authenticated page where the user can see their overview
  dashboard/portfolio.js => authenticated page where the user can see their portfolio + it's growth

*/
