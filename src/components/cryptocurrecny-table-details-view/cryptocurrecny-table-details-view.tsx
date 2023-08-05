import { FC } from "react";
import { Button, Popover } from "@mantine/core";
import BrandMediumSVG from "../icons/BrandMediumSVG";
import BrandSlackSVG from "../icons/BrandSlackSVG";
import BrandTelegramSVG from "../icons/BrandTelegramSVG";
import BrandDiscordSVG from "../icons/BrandDiscordSVG";
import BrandTwitterSVG from "../icons/BrandTwitterSVG";
import BrandRedditSVG from "../icons/BrandRedditSVG";
import BrandFacebookSVG from "../icons/BrandFacebookSVG";
import MoreOptionsIcon from "../icons/moreOptionsIcon";

interface CryptocurrecnyTableDetailsViewProps {
  data: CryptoAssetDTO;
}

const LinkItemSVGIcons = ({ label, urls }) => (
  <div className="mb-4">
    <p className="font-semibold">{label}</p>
    <div className="flex -space-x-1 overflow-hidden rounded-lg bg-gray-100 p-1 transition-all duration-300 ease-in-out hover:space-x-1">
      <ul>
        {urls.map((url, index) =>
          url ? (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className=" flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 ring-2 ring-white"
            >
              {url.indexOf("t.me") >= 0 ? <BrandTelegramSVG /> : null}
              {url.indexOf("slack") >= 0 ? <BrandSlackSVG /> : null}
              {url.indexOf("medium") >= 0 ? <BrandMediumSVG /> : null}
              {url.indexOf("discord") >= 0 ? <BrandDiscordSVG /> : null}
              <span className="sr-only">{`${label} ${index + 1}`}</span>
            </a>
          ) : null
        )}
      </ul>
    </div>
  </div>
);
const LinksComponentOld = ({ links }) => (
  <div className="w-full rounded-lg bg-white p-4 shadow">
    {/* <div className="border-b p-4">
      <h2 className="text-2xl ">Links</h2>
      <p className="text-sm text-gray-500">important links</p>
    </div> */}
    <LinkItem label="Homepage" urls={links.homepage} />
    <LinkItem label="Blockchain Sites" urls={links.blockchain_site} />
    <LinkItem label="Official Forum URL" urls={links.official_forum_url} />
    <LinkItem label="Chat URL" urls={links.chat_url} />
    <LinkItem label="Announcement URL" urls={links.announcement_url} />

    {/* <LinkItem label="Twitter Screen Name" urls={twitterUrl} /> */}
    {/* <LinkItem label="Facebook Username" urls={links.facebook_username} /> */}
    <LinkItem
      label="Bitcointalk Thread Identifier"
      urls={links.bitcointalk_thread_identifier?.toString()}
    />
    {/* <LinkItem label="Telegram Channel Identifier" urls={telegramUrl} /> */}

    {/* <LinkItem label="Subreddit URL" urls={links.subreddit_url} /> */}
    <LinkItem label="Repos URL (GitHub)" urls={links.repos_url.github} />
  </div>
);

const LinkItemOld = ({ label, urls }) => {
  const isValidUrl = url => url !== "" && url?.includes("http");
  const validUrls = Array.isArray(urls) ? urls.filter(isValidUrl) : [];
  const renderLink = (url, index) => (
    <li key={index} className="">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-11/12 truncate text-blue-500"
      >
        {url}
      </a>
    </li>
  );

  const renderArrayOfUrl = urls => (
    <ul className="list-inside list-disc">
      {urls.length > 0 ? urls.map(renderLink) : <li>N/A</li>}
    </ul>
  );
  const renderUrlBlock = urls =>
    isValidUrl(urls) ? (
      <a
        href={urls}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full truncate text-blue-500"
      >
        {urls}
      </a>
    ) : (
      <p className="inline-block w-full truncate">{urls || "N/A"}</p>
    );
  return (
    <div className="space-y-1 border-b p-4 hover:bg-gray-50 md:grid md:grid-cols-2 md:space-y-0">
      <p className="text-gray-600">{label}</p>

      {Array.isArray(urls) ? renderArrayOfUrl(validUrls) : renderUrlBlock(urls)}
    </div>
  );
};

const LinkItem = ({ label, urls }) => {
  const isValidUrl = url => url !== "" && url?.includes("http");
  const validUrls = Array.isArray(urls) ? urls.filter(isValidUrl) : [];
  const renderLink = (url, index) => (
    <li key={index} className="">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-11/12 truncate text-blue-500"
      >
        {url}
      </a>
    </li>
  );

  const renderArrayOfUrl = (arrayOfUrls: Array<string>) => (
    <ul className="list-inside list-disc">
      {arrayOfUrls.length > 0 ? arrayOfUrls.map(renderLink) : <li>N/A</li>}
    </ul>
  );
  const renderUrlBlock = (url: string) =>
    isValidUrl(url) ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full truncate text-blue-500"
      >
        {url}
      </a>
    ) : (
      <p className="inline-block w-full truncate">{url || "N/A"}</p>
    );
  return (
    <div className="space-y-1 border-b p-2 hover:bg-gray-50 md:grid md:grid-cols-2 md:space-y-0">
      <p className="text-gray-600">{label}</p>

      {Array.isArray(urls) ? renderArrayOfUrl(validUrls) : renderUrlBlock(urls)}
    </div>
  );
};

const LinksComponent = ({ links }) => (
  <div className="w-full rounded-lg bg-white shadow">
    <LinkItem label="Homepage" urls={links.homepage} />
    <LinkItem label="Blockchain Sites" urls={links.blockchain_site} />
    <LinkItem label="Official Forum URL" urls={links.official_forum_url} />
    <LinkItem label="Chat URL" urls={links.chat_url} />
    <LinkItem label="Announcement URL" urls={links.announcement_url} />
    <LinkItem
      label="Bitcointalk Thread Identifier"
      urls={links.bitcointalk_thread_identifier?.toString()}
    />
    <LinkItem label="Repos URL (GitHub)" urls={links.repos_url.github} />
  </div>
);

const GridItem = ({ link, svgComponent: SVGComponent }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="block">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-charcoal-400 text-gray-500 hover:bg-charcoal-300">
      {SVGComponent && <SVGComponent width={24} height={24} />}
    </div>
  </a>
);

const SocialLinksGrid = ({ links }) => {
  const twitterUrl = links.twitter_screen_name
    ? `https://twitter.com/${links.twitter_screen_name}`
    : undefined;

  const telegramUrl = links.telegram_channel_identifier
    ? `https://t.me/${links.telegram_channel_identifier}`
    : undefined;

  const facebookUrl = links.facebook_username
    ? `https://www.facebook.com/${links.facebook_username}`
    : undefined;

  const socialLinks = {
    telegram: telegramUrl,
    twitter: twitterUrl,
    reddit: links.subreddit_url,
    facebook: facebookUrl
  };
  return (
    <div className="flex w-fit space-x-2 rounded-lg border border-gray-500 bg-charcoal-900 p-2">
      <GridItem link={socialLinks.facebook} svgComponent={BrandFacebookSVG} />
      <GridItem link={socialLinks.twitter} svgComponent={BrandTwitterSVG} />
      <GridItem link={socialLinks.reddit} svgComponent={BrandRedditSVG} />
      <GridItem link={socialLinks.telegram} svgComponent={BrandTelegramSVG} />

      <Popover width={500} position="bottom" withArrow shadow="md" arrowPosition="side">
        <Popover.Target>
          <Button>
            <MoreOptionsIcon width={24} height={24} />
          </Button>
          {/* <GridItem link={undefined} svgComponent={MoreOptionsIcon} /> */}
        </Popover.Target>
        <Popover.Dropdown>
          <LinksComponent links={links} />
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};
const CryptocurrecnyTableDetailsView: FC<CryptocurrecnyTableDetailsViewProps> = ({ data }) => {
  if (!data) {
    return null;
  }
  const { links } = data;

  return (
    <section className="my-1 flex justify-between rounded-lg border border-gray-500 px-4 py-2 text-xs">
      <div>
        <p className="py-2 text-sm font-medium">Categories:</p>
        <div className="flex flex-wrap">
          {data.categories.map(category => (
            <span
              key={`category-${category}`}
              className="mb-2 mr-2 rounded-lg bg-charcoal-300 p-2  text-white"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      <div className="">
        <SocialLinksGrid links={links} />
      </div>
    </section>
  );
};

export default CryptocurrecnyTableDetailsView;
