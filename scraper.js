const cheerio = require("cheerio");

exports.getData = async (html) => {
  const $ = await cheerio.load(html);
  const scrapeResults = $(".result-info")
    .map((index, element) => {
      const resultTitle = $(element).children(".result-heading").children(".result-title");
      const title = resultTitle.text().trim();
      const url = resultTitle.attr("href");
      const date = new Date($(element).children("time").attr("datetime"));
      return { title, url, date };
    })
    .get();
  return scrapeResults;
};
