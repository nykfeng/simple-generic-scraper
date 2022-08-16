const puppeteer = require("puppeteer");
const scraper = require("./scraper");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "city and state.csv",
  header: [
    { id: "cityName", title: "city" },
    { id: "stateName", title: "state" },
  ],
});

const urlToVisit = "http://www.theus50.com/newyork/cities.php";

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

  csvWriter
    .writeRecords(scrapingResults)
    .then(() => console.log("The CSV file was written successfully"));
  // console.log(craigslistPage);
}

main();
