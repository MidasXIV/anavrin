import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import clsx from "clsx";

const resourcesOptions: { title: string; href: string; description: string }[] = [
  {
    title: "Blog",
    href: "/blog",
    description: "Explore platform guides and tutorials for effective usage."
  },
  {
    title: "Community",
    href: "/docs/primitives/hover-card",
    description: "Join our Discord community to connect and share insights."
  },
  {
    title: "Support",
    href: "https://twitter.com/yourTwitterHandle",
    description: "Reach out for assistance or inquiries on Twitter."
  }
];

const learnOptions: { title: string; href: string; description: string }[] = [
  {
    title: "Trading Strategies",
    href: "/docs/primitives/alert-dialog",
    description: "Discover effective trading strategies to optimize decisions."
  },
  {
    title: "Dividend Investing",
    href: "/docs/primitives/hover-card",
    description: "Explore creating a steady income stream through dividends."
  },
  {
    title: "Algorithmic Trading",
    href: "/docs/primitives/progress",
    description: "Dive into the world of algorithmic trading and automated systems."
  },
  {
    title: "Crypto Investment",
    href: "/docs/primitives/scroll-area",
    description: "Navigate the complexities of cryptocurrency investment."
  }
];

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={clsx(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
);
ListItem.displayName = "ListItem";

const WebsiteHeader: FC<unknown> = () => {
  const router = useRouter();
  return (
    <>
      <header className="clearNav sticky inset-x-0 top-4 z-50 mx-auto my-4 w-fit flex-wrap rounded-md bg-white text-sm shadow-md">
        {/* <nav
          className="relative px-4 py-2 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <div className="flex items-center justify-center px-2">
            <a
              className="flex-none text-2xl font-semibold dark:text-white"
              href="#"
              aria-label="Brand"
            >
              <span className="outline-font font-wide text-xl">ANAVRIN</span>
            </a>
          </div>
          <div className="mx-auto flex flex-wrap items-center justify-between px-6">
            <div
              className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
              id="navbar-search"
            >
              <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
                <li>
                  <Link
                    href="#home"
                    className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  >
                    Features
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
        </nav> */}
        <NavigationMenu className="bg-transparent p-2">
          <NavigationMenuList className="bg-transparent">
            <NavigationMenuItem className="hidden bg-transparent sm:block">
              <Link href="#" legacyBehavior passHref className="bg-transparent">
                <NavigationMenuLink
                  className={clsx("bg-transparent", navigationMenuTriggerStyle())}
                >
                  <span className="outline-font font-wide text-xl">ANAVRIN</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="bg-transparent">
              <NavigationMenuTrigger className="bg-transparent">Resources</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-transparent">
                <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="outline-font mb-2 mt-4 font-wide text-lg">ANAVRIN</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Focus on your investment strategy while we handle the details.
                        </p>
                      </a>
                    </NavigationMenuLink>
                    {/* <div className="flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md">
                      <div className="text-sm font-medium leading-none">Learn</div>
                      <ul className="py-4">
                        <li className="line-clamp-2 block select-none space-y-1 rounded-md p-3 text-sm leading-snug text-muted-foreground no-underline outline-none transition-colors hover:cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          Artifical intillegence
                        </li>
                        <li className="line-clamp-2 block select-none space-y-1 rounded-md p-3 leading-snug text-muted-foreground no-underline outline-none transition-colors hover:cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          Dividends
                        </li>
                        <li className="line-clamp-2 block select-none space-y-1 rounded-md p-3 leading-snug text-muted-foreground no-underline outline-none transition-colors hover:cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          Crypto
                        </li>
                      </ul>
                    </div> */}
                  </li>

                  {resourcesOptions.map(component => (
                    <ListItem key={component.title} title={component.title} href={component.href}>
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="bg-transparent">
              <NavigationMenuTrigger className="bg-transparent">Learn</NavigationMenuTrigger>
              <NavigationMenuContent className="clearNav bg-transparent">
                <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {learnOptions.map(component => (
                    <ListItem key={component.title} title={component.title} href={component.href}>
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {/* <NavigationMenuItem className="bg-transparent">
              <NavigationMenuTrigger className="bg-transparent">Resources</NavigationMenuTrigger>
              <NavigationMenuContent className="clearNav bg-transparent">
                <ul className="w-[300px] p-4 ">
                  <ListItem href="/blog" title="Blog" />
                  <ListItem href="/learn" title="Learn" />
                  <ListItem href="/docs/primitives/typography" title="Community" />
                  <ListItem href="/docs/primitives/typography" title="Support" />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
            <NavigationMenuItem className="bg-transparent">
              <Link href="/dashboard" legacyBehavior passHref className="bg-transparent">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Launch App
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    </>
  );
};
export default WebsiteHeader;
