"use strict";
(() => {
var exports = {};
exports.id = 914;
exports.ids = [914];
exports.modules = {

/***/ 48:
/***/ ((module) => {

module.exports = require("cheerio");

/***/ }),

/***/ 253:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "xml2js"
const external_xml2js_namespaceObject = require("xml2js");
;// CONCATENATED MODULE: ./pages/api/products/[sku].ts

async function handler(req, res) {
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
        const sku = req.query.sku;
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
async function parseXml(xmlData) {
    return new Promise((resolve, reject)=>{
        (0,external_xml2js_namespaceObject.parseString)(xmlData, (err, result)=>{
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
function findUrlBySku(xmlDoc, sku) {
    const urlElements = xmlDoc?.urlset?.url || [];
    const matchingUrlElement = urlElements.find((urlElement)=>{
        const url = urlElement.loc[0];
        const pdIndex = url.indexOf("/pd/");
        let sub_url = url.substring(0, pdIndex);
        const lastIndex = sub_url.lastIndexOf("/");
        let possible_sku = sub_url.substring(lastIndex + 1);
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
    const cheerio = __webpack_require__(48);
    const $ = cheerio.load(html);
    const productDetailInfo = $(".CBD-ProductDetailInfo");
    // Find the element with class name "CBD-ProductDetailTitle" inside the "CBD-ProductDetailInfo"
    const title = productDetailInfo.find(".CBD-ProductDetailTitle").text();
    const authorElements = productDetailInfo.find(".CBD-ProductDetailAuthor");
    // Extract the author text only if it  begins with the the text "By:"
    let author = "";
    authorElements.each((index, element)=>{
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
    return {
        title,
        author,
        price
    };
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(253));
module.exports = __webpack_exports__;

})();