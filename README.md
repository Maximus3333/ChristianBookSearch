This is a starter template for [Learn Next.js](https://nextjs.org/learn).


Answers to Questions: 
1. When the user enters a sku # in the ChakraUI input field and clicks the "Submit" the handleSubmit function is called; which append the sku to the URL as a query parameter, and a GET request is made to the /api/products/[sku] endpoint using the fetch API.

On the server side, the /api/products/[sku].ts endpoint is responsible for handling the request. This endpoint first fetches an XML file containing a list of URLs from the Christianbook website using the fetch API. The XML data is then parsed into an XML Document object using the xml2js library.

The endpoint then extracts the SKU value from the query parameters and searches for a URL that contains the exact SKU value in the XML data using the findUrlBySku function. If a matching URL is found, the server makes another GET request to that URL to fetch the product data from the Christianbook website. The product data is then parsed using the cheerio library to extract the title, author, and price information from the html data .

The parsed product data is sent as a JSON response back to the client, where it is set in the state using the setProductData function. If there is any error during the process, an appropriate error message is sent back to the client.

On the client side, the isLoading state is used to display a loading spinner when the user clicks the "Submit" button, indicating that the request is being processed.

Once the product data is received from the server, it is displayed using chakra components in the MyForm component. The title, author, and price of the product are shown in a card layout, and the loading spinner is then hidden.

2 and 3. To scale we first have to get the sitemaps urls, then fetch and parse each sitemap and then search for the SKU in each sitemap. However, searching across multiple sitemaps can result in a large number of requests, so we would need to handle potential rate limiting or throttling from the server, which means having a load balancer to serve requests to multiple servers to do the searching, caching to store previously fetched sitemaps and their parsed data, or implement some type of parallel processing. For example with with 100 users, it should handle the load without much trouble. The responses should be relatively fast, and the overall performance should be smooth.
10,000 Users: With 10,000 users, the load on the system will increase and test the scalability the app. We might need to consider load balancing and horizontal scaling to distribute the load across multiple servers or instances. Caching and efficient algorithms for parsing and searching sitemaps will become more critical as mentioned above.
1,000,000 Users: Handling one million users is a substantial load for any system. At this scale, wee'll need to invest in robust infrastructure, auto-scaling mechanisms, and advanced caching strategies. Distributed processing, caching, and optimizing database queries so that the system remains responsive and performs well.

4. I used nextjs documentation to get started with the app, also i refreshed myself with RESTFUL apis and best practices using: https://engineering.udacity.com/5-steps-to-create-professional-api-routes-in-next-js-201e726ead48
Also i googled best way to handle and parse XML data and used xml2js documentation aswell as cheerios documentation when googling how to traverse html web data. I also used various stackoverflow links and chakraui documentation for the ui.
5. I spent about 5 hours on the whole project, I would spend more time to create a better search algorithm to search and parse through the sitemap for efficeny, also, i would of spent more time making the ui a bit more clean modern. If need be i would also spend more time implementing one of the solutions above to scale the system.
6. I would say the code is well-organized even though it is small. In terms of code structure the files and folders are structured well, i broke down the functionality into smaller functions, which promotes code reusability and readability. I used asynchronous functions and await/async to handle asynchronous operations like fetching data from the api, which improves the responsiveness of the application.
I effectively used external libraries like cheerio and xml2js for parsing and manipulating HTML and XML data, respectively, which is a good approach to avoid reinventing the wheel.
ALsoo the system is using data fetching and parsing on the server-side, which is generally a good practice as it offloads the processing from the client-side and improves SEO and initial load times.
Finally, I implemented a RESTful API by defining clear endpoints.
Overall i think i did a good job and am proud of the work I did.
7. To update the system to support simple keyword searches, we can modify the findUrlBySku function to search for keywords in the URL instead of just skus #s in the url. For example we can: create a new function to handle keyword searches, similar to findUrlBySku, but this time it will search for urls containing the provided keywords from the request.
Then we can Parse the keyword(s) from the request query parameters and search for URLs that contain the provided keyword using the new function.
Finally we return matching urls as a response, then scrape and map the urls to display the data we need from them.