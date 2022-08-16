const puppeteer = require("puppeteer");
const scraper = require("./scraper");

const urlToVisit = "";

async function main() {
  // headless: running without a graphical user interface.
  // since here for testing purpose, set it to false to show it
  // so it's easier to debug
  const browers = await puppeteer.launch({ headless: false });

  const page = await browers.newPage();
  await page.goto(urlToVisit);
  const htmlPageResult = await page.evaluate(
    () => document.querySelector("*").outerHTML
  );

  const scrapingResults = await scraper.getData(htmlPageResult);

  console.log(scrapingResults);

  // console.log(craigslistPage);
}

main();