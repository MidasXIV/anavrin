import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import BrandTelegramSVG from "../icons/BrandTelegramSVG";
import BrandTwitterSVG from "../icons/BrandTwitterSVG";
import BrandRedditSVG from "../icons/BrandRedditSVG";
import BrandFacebookSVG from "../icons/BrandFacebookSVG";
import MoreOptionsIcon from "../icons/moreOptionsIcon";
import CategoryChipGroup from "../category-chip-group/category-chip-group";

interface CryptocurrecnyTableDetailsViewProps {
  data: CryptoAssetDTO;
}

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

      <Popover>
        <PopoverTrigger>
          <MoreOptionsIcon width={24} height={24} />
        </PopoverTrigger>
        <PopoverContent className="w-[500px] text-xs">
          <LinksComponent links={links} />
        </PopoverContent>
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
      <div className="max-w-md">
        <p className="py-2 text-sm font-medium">Categories:</p>
        <div className="flex flex-wrap">
          <CategoryChipGroup categories={data.categories} />
        </div>
      </div>
      <div className="">
        <SocialLinksGrid links={links} />
      </div>
    </section>
  );
};

export default CryptocurrecnyTableDetailsView;
