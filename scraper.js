const cheerio = require("cheerio");

exports.getData = async (html) => {
  const $ = await cheerio.load(html);

  // for this specifically, get all the a tags
  const scrapeResults = $(
    "body > section > div > div > div.col-xs-12.col-sm-6.mainContent > div.row a"
  )
    .map((index, element) => {
      // Get the text of each a tag
      const resultText = $(element).text();

      // Extract text from result

      // city name + ", NY"
      // so city name + 4 characters
      const stateName = resultText.substring(
        resultText.length - 2,
        resultText.length
      );

      const cityName = resultText.substring(0, resultText.length - 4);

      return { cityName, stateName };
    })
    .get();
  return scrapeResults;
};
