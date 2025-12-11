const puppeteer = require("puppeteer");

async function generatePdf(html, filePath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);
  await page.pdf({ path: filePath, format: "A4" });

  await browser.close();
  return filePath;
}

module.exports = { generatePdf };
