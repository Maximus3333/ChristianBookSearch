import { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = "https://www.christianbook.com/sitemap4.xml";
  console.log("helloooo");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const xmlData = await response.text();
    const xmlDoc = await parseXml(xmlData);
    console.log(xmlDoc["urlset"]["url"][1]);

    const sku = req.query.sku as string;
    console.log(sku, "sku");

    const matchingUrl = findUrlBySku(xmlDoc, sku);

    if (!matchingUrl) {
      res.status(404).send("URL not found for the given SKU");
      return;
    }

    const productResponse = await fetch(matchingUrl);
    if (!productResponse.ok) {
      throw new Error("Error fetching product data from the URL");
    }

    const productData = await productResponse.text();

    res.status(200).send(parseProductData(productData));
  } catch (error) {
    console.log(error);

    res.status(500).send("Error fetching data from the API");
  }
}

// Function to parse the XML data into an XML Document object
async function parseXml(xmlData: string): Promise<Document> {
  return new Promise((resolve, reject) => {
    parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function findUrlBySku(xmlDoc: any, sku: string): string | null {
  const urlElements = xmlDoc?.urlset?.url || [];
  const matchingUrlElement = urlElements.find((urlElement: any) => {
    const url = urlElement.loc[0];
    const pdIndex = url.indexOf('/pd/');
    let sub_url = url.substring(0, pdIndex)
    const lastIndex = sub_url.lastIndexOf('/');
    let possible_sku = sub_url.substring(lastIndex+1)

    if (possible_sku === sku) {
      return url;
    }
    
  });
  

  if (matchingUrlElement) {
    
    return matchingUrlElement.loc[0];
  }

  return null;
}



function parseProductData(html) {
  const cheerio = require("cheerio");
  const $ = cheerio.load(html);
  const productDetailInfo = $(".CBD-ProductDetailInfo");

  // Find the element with class name "CBD-ProductDetailTitle" inside the "CBD-ProductDetailInfo"
  const title = productDetailInfo.find(".CBD-ProductDetailTitle").text();

  const authorElements = productDetailInfo.find(".CBD-ProductDetailAuthor");

  // Extract the author text only if it  begins with the the text "By:"
  let author = "";
  authorElements.each((index, element) => {
    const text = $(element).text();
    if (text.startsWith("By:")) {
      author = $(element).find(".CBD-ProductDetailAuthorLink").text().trim();
      return false;
    }
  });

  const priceElement = $(".CBD-ProductDetailActionPrice");

  // Extract the price text from the "CBD-ProductDetailActionPrice" element
  let price = "";
  if (priceElement.length) {
    price = priceElement.text().trim();
    // Remove the "Our Price" label from the price text (if it exists)
    price = price.replace("Our Price", "").trim();
  }
  console.log(title, "||||", author, "||", price);

  return { title, author, price };
}
