/* eslint-disable no-console */
/**
 * NOTE:
 * To run this script you require: Node v - 12.9.0 or above
 *
 * USAGE:
 * + To generate layout of each viewport during local dev run
 * > npm run profile-layout:dev
 *
 * + To generate layout of each viewport during prod run
 * > npm run profile-layout -- -u <site-url>
 *
 * + To generate layout of specific viewport [local]
 * > npm run profile-layout:dev -- -v desktop
 *
 * + local profile-layout shorthand
 * > npm run pl:dev:phone
 * > npm run pl:dev:landscape
 * > npm run pl:dev:ipad
 * > npm run pl:dev:tablet
 * > npm run pl:dev:laptop
 * > npm run pl:dev:desktop
 *
 * OPTIONS:
 * -u => to define the url of the page
 *
 * WORKFLOW:
 * 1. import sitemap
 * 2. goto each endpoint mentioned in sitemap
 * 3. cature each page in different view ports
 */

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require("puppeteer-core");
const stdio = require("stdio");
const fs = require("fs");
const rimraf = require("rimraf");
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
  },
  viewport: {
    key: "v",
    args: 1,
    required: false,
    default: "NOT_PROVIDED",
    description: "select a viewport, defaults to all"
  }
});

/** *************************************************************
 *                     Script config
 ************************************************************** */

const APP_BASE_URL = options.url;
let APP_VIEWPORT = Object.keys(VIEWPORTS).filter(viewport => viewport === options.viewport);
if (APP_VIEWPORT.length < 1) {
  APP_VIEWPORT = Object.keys(VIEWPORTS);
}

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
    case "t":
      console.table(message);
      break;
    default:
      console.log(message);
  }
};

/** *************************************************************
 *                     Controller functions
 ************************************************************** */

async function closeHeadlesssChrome(browserObj) {
  formatMessage("-- Trying to Close Chome Headless Window", "m");
  await browserObj.close();
}

async function setChromeViewport(pageObj, viewport) {
  // formatMessage("-- Trying to Update page viewPort");
  await pageObj.setViewport(viewport);
}

async function setUserAgent(pageObj) {
  // formatMessage("-- Setting User Agent");
  pageObj.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
}

const takeScreenshot = async (pageObj, viewport, endpoint, srcUrl) => {
  formatMessage(`-- Trying to Load Web Page ${srcUrl}`);
  await pageObj.goto(srcUrl).catch(error => {
    throw error;
  });
  // causes the program to break for some reason
  // await pageObj.waitForNavigation({ waitUntil: "networkidle2" });

  if (endpoint === "") {
    // eslint-disable-next-line no-param-reassign
    endpoint = "index";
  }

  formatMessage(`-- ${viewport} - ${srcUrl}`);
  await pageObj.screenshot({
    path: `${LAYOUT_PROFILE_DIRECTORY}/${viewport}/${endpoint}.png`,
    fullPage: true
  });
};

/** *************************************************************
 *                     Main Workflow
 ************************************************************** */

formatMessage(`APP BASE URL  :: ${APP_BASE_URL}`, "m");
formatMessage(`APP VIEWPORT  :: ${APP_VIEWPORT}`, "m");
formatMessage(`APP PAGES     :: ${JSON.stringify(APP_PAGES_LIST.endpoints)}`, "m");

// Remove older directories
APP_VIEWPORT.forEach(viewport => {
  rimraf.sync(`${LAYOUT_PROFILE_DIRECTORY}/${viewport}`);
  formatMessage(`deleted ${LAYOUT_PROFILE_DIRECTORY}/${viewport} directory`, "s");
});

// Create profile-layout directory if doesn't exist
if (!fs.existsSync(LAYOUT_PROFILE_DIRECTORY)) {
  formatMessage(`creating layout-profile directory`, "s");
  fs.mkdirSync(LAYOUT_PROFILE_DIRECTORY);
}

// create viewport directories if doesn't exist
APP_VIEWPORT.forEach(viewport => {
  const directory = `${LAYOUT_PROFILE_DIRECTORY}/${viewport}`;
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
    formatMessage(`created ${directory} directory`, "s");
  }
});

const createServer = async url => {
  const launchOptions = {
    headless: true,
    // because we are using puppeteer-core so we must define executablePath option
    executablePath: `C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe`,
    args: ["--start-maximized"]
  };

  const browser = await puppeteer.launch(launchOptions);
  formatMessage(await browser.version(), "m");

  const promises = [];
  // iterate over each viewport
  APP_VIEWPORT.forEach(viewport => {
    // iterate over each endpoint
    APP_PAGES_LIST.endpoints.map(async endpoint => {
      const resourceURL = `${url}/${endpoint}`;
      promises.push(
        new Promise((resolve, reject) => {
          browser
            .newPage()
            .then(async page => {
              await setChromeViewport(page, VIEWPORTS[viewport]);
              await setUserAgent(page);
              await takeScreenshot(page, viewport, endpoint, resourceURL);
              resolve({
                page: resourceURL,
                status: "success",
                viewport
              });
            })
            .catch(error => {
              // Error constructor only supports string, pass rest as properties
              const err = new Error(error.message);
              err.page = resourceURL;
              err.status = "failed";
              err.viewport = viewport;
              reject(err);
            });
        })
      );
    });
  });

  Promise.allSettled(promises)
    .then(_promises => {
      const compiledStatus = _promises.map(promise => {
        if (promise.status === "rejected") {
          const e = promise.reason;
          return {
            page: e.page,
            status: e.status,
            message: e.message,
            viewport: e.viewport
          };
        }
        return promise.value;
      });
      formatMessage(`promsies :: ${_promises.length}`);
      formatMessage(compiledStatus, "t");
    })
    .then(() => {
      // close the browser
      closeHeadlesssChrome(browser);
    })
    .catch(error => console.log(`Error in Promise.allSettled() Handler`, error));
};

createServer(APP_BASE_URL);
