/**
 * WORKFLOW
 * 1. import sitemap
 * 2. goto each endpoint mentioned in sitemap
 * 3. cature each page in different view ports
 */

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require("puppeteer-core");
const stdio = require("stdio");
const fs = require("fs");
const APP_PAGES_LIST = require("../public/sitemap.json");

const LAYOUT_PROFILE_DIRECTORY = "profile-layout";
const VIEWPORTS = {
  phone: {
    width: 360,
    height: 740,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    isLandscape: false
  },
  landscape: {
    width: 740,
    height: 360,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    isLandscape: true
  },
  ipad: {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    isLandscape: false
  },
  tablet: {
    width: 1280,
    height: 800,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: true,
    isLandscape: true
  },
  laptop: {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    isLandscape: false
  },
  desktop: {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    isLandscape: false
  }
};

/**
 * usage example
 * node <your_script.js> -u https://google.com
 * Then ops object will be as follows: { url: 'https://google.com' }
 */

const options = stdio.getopt({
  url: {
    key: "u",
    args: 1,
    description: "base URL of app to profile"
  }
});

/**
 * Loading Application Config
 */
const appBaseURL = options.url;

/** *************************************************************
 *                     Helper functions
 ************************************************************** */

const formatMessage = (message, type) => {
  switch (type) {
    case "s":
      console.log(`\x1b[33m%s\x1b[0m`, message, `\x1b[0m`);
      break;
    case "m":
      console.log(`\x1b[35m`, message, `\x1b[0m`);
      break;
    default:
      console.log(message);
  }
  // console.log(`\x1b[0m`); // reset console color
};

/** *************************************************************
 *                     Controller functions
 ************************************************************** */

async function closeHeadlesssChrome(browserObj) {
  formatMessage("-- Trying to Close Chome Headless Window");
  await browserObj.close();
}

async function setChromeViewport(pageObj) {
  formatMessage("-- Trying to Update page viewPort");
  await pageObj.setViewport({
    width: 414,
    height: 763,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: false,
    isLandscape: false
  });
}

async function setUserAgent(pageObj) {
  formatMessage("-- Setting User Agent");
  pageObj.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
}

const takeScreenshot = async (pageObj, srcUrl) => {
  formatMessage(`-- Trying to Load Web Page ${srcUrl}`);
  await pageObj.goto(srcUrl);

  formatMessage("-- Trying to Take Screenshot");
  await pageObj.screenshot({
    path: `${LAYOUT_PROFILE_DIRECTORY}/default.png`,
    fullPage: true
  });
};

/** *************************************************************
 *                     Main Workflow
 ************************************************************** */

if (!fs.existsSync(LAYOUT_PROFILE_DIRECTORY)) {
  formatMessage(`creating layout-profile directory`, "s");
  fs.mkdirSync(LAYOUT_PROFILE_DIRECTORY);
}

formatMessage(`Base URL of app :: ${appBaseURL}`);

const createServer = async url => {
  const launchOptions = {
    headless: true,
    // because we are using puppeteer-core so we must define executablePath option
    executablePath: `C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe`,
    args: ["--start-maximized"]
  };

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  formatMessage(await browser.version(), "m");

  // set viewport and user agent (just in case for nice viewing)
  await setChromeViewport(page);
  await setUserAgent(page);

  // go to the target web
  await takeScreenshot(page, "https://dev.to");
  // close the browser
  await closeHeadlesssChrome(browser);
};

createServer(appBaseURL);
