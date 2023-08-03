This is a starter template for [Learn Next.js](https://nextjs.org/learn).


# Answers to Questions: 
## Question 1.
### Breakdown of the app:
 1. User enters a sku # in the ChakraUI input field and clicks the "Submit" the handleSubmit function is called; which append the sku to the URL as a query parameter, and a GET request is made to the /api/products/[sku] endpoint using the fetch API.

2. On the server side, the /api/products/[sku].ts endpoint is responsible for handling the request. This endpoint first fetches an XML file containing a list of URLs from the Christianbook website using the fetch API. The XML data is then parsed into an XML Document object using the xml2js library.

3. The endpoint then extracts the SKU value from the query parameters and searches for a URL that contains the exact SKU value in the XML data using the findUrlBySku function. If a matching URL is found, the server makes another GET request to that URL to fetch the product data from the Christianbook website. The product data is then parsed using the cheerio library to extract the title, author, and price information from the html data .

4. The parsed product data is sent as a JSON response back to the client, where it is set in the state using the setProductData function. If there is any error during the process, an appropriate error message is sent back to the client.

5. On the client side, the isLoading state is used to display a loading spinner when the user clicks the "Submit" button, indicating that the request is being processed.

6. Once the product data is received from the server, it is displayed using chakra components in the MyForm component. The title, author, and price of the product are shown in a card layout, and the loading spinner is then hidden.

## Questions 2 and 3. 

## Improvements
1. **Cache Xml file on startup in backend server.** Instead of reading 48,000 records per request, this will save computing time because data will already will be loaded and we will just search for it.

2. 
    **Build index for the data based off lookup attribute being sku, which will further improve performance
## General how To scale:
    1. Get the sitemaps urls in backend on startup, 
    2. then fetch and parse each sitemap and then search for the SKU in each sitemap. 
    3. If we find the url with corresponding sku, cache sku as key and url as value in a hashmap
## 100 users
 it should handle the load without much trouble. The responses should be relatively fast, and the overall performance should be smooth as long as we make the improvements above.
## 10,000 Users:
 With 10,000 users, the load on the system will increase and test the scalability the app. We might need to consider load balancing and horizontal scaling to distribute the load across multiple servers or instances. Caching and efficient algorithms for parsing and searching sitemaps will become more critical as mentioned above.
## 1,000,000 Users:
 Handling one million users is a substantial load for any system. At this scale, wee'll need to invest in robust infrastructure, auto-scaling mechanisms, and advanced caching strategies. Distributed processing, caching, and optimizing database queries so that the system remains responsive and performs well.
#
## Question 4. 
I used nextjs documentation to get started with the app, also i refreshed myself with RESTFUL apis and best practices using: https://engineering.udacity.com/5-steps-to-create-professional-api-routes-in-next-js-201e726ead48
Also i googled best way to handle and parse XML data and used xml2js documentation aswell as cheerios documentation when googling how to traverse html web data. I also used various stackoverflow links and chakraui documentation for the ui.
## Question 5. 
I spent about 5 hours on the whole project, I would spend more time to create a better search algorithm to search and parse through the sitemap for efficeny, also, i would of spent more time making the ui a bit more clean modern. If need be i would also spend more time implementing one of the solutions above to scale the system.
## Question 6. 
Other than the improvements i mentioned above I would say the code is well-organized even though it is small. In terms of code structure the files and folders are structured well, i broke down the functionality into smaller functions, which promotes code reusability and readability. I used asynchronous functions and await/async to handle asynchronous operations like fetching data from the api, which improves the responsiveness of the application.
I effectively used external libraries like cheerio and xml2js for parsing and manipulating HTML and XML data, respectively, which is a good approach to avoid reinventing the wheel.
ALso the system is using data fetching and parsing on the server-side, which is generally a good practice as it offloads the processing from the client-side and improves SEO and initial load times.
Finally, I implemented a RESTful API by defining clear endpoints.
Overall i think i did a good job and am proud of the work I did.
## Question 7. 
To update the system to support simple keyword searches, we can modify the findUrlBySku function to search for keywords in the URL instead of just skus #s in the url. 
##### Steps
    1. create a new function to handle keyword searches, similar to findUrlBySku, but this time it will search for urls containing the provided keywords from the request.
    2. Then we can Parse the keyword(s) from the request query parameters and search for URLs that contain the provided keyword using the new function.
    3. Finally we return matching urls as a response, then scrape and map the urls to display the data we need from them.