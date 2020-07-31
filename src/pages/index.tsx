import { useState } from "react";
import Link from "next/link";
import { DropdownMenu, Menu } from "../components";

export default function Home() {
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

          <Link href="/dashboard">
            <a className="btn">Open App</a>
          </Link>
        </nav>
      </header>
      <div className="landing">
        <h1>
          Simple tracking & simulation for your portfolio. Make better decisions
          with real data.
        </h1>
        <div className="landing-buttons">
          <Link href="/dashboard">
            <a className="mr-half btn">Open the app</a>
          </Link>
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
