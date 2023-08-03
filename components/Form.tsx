import React, { useState } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Spinner,
  Card,
  Box,
} from "@chakra-ui/react";

const MyForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true); // Set loading to true when the submit button is clicked

      const params = new URLSearchParams();
      params.append("sku", inputValue);

      // Append the query parameters to the URL
      const get_url = `/api/products/${inputValue}`;

      const response = await fetch(get_url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); // Parse the response to JSON
      setProductData(data);
      setError(""); // Clear any previous error
    } catch (error) {
      setError("Error fetching data from the API");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading back to false when the request is done
    }
  };

  return (
    <Flex align={"center"} justify={"center"} direction={"column"}>
      <Card align="center" width={"500px"}>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            placeholder="Enter Sku #"
            onChange={(e) => setInputValue(e.target.value.replace(/\s+/g, ''))}
          />
          <InputRightElement width="5.5rem">
            <Button h="1.75rem" size="sm" onClick={handleSubmit}>
              Submit
            </Button>
          </InputRightElement>
        </InputGroup>
      </Card>

      {isLoading && <Spinner />}

      {error && <Text color="red">{error}</Text>}
      {productData && (
        <ProductDetails
          title={productData.title}
          author={productData.author}
          price={productData.price}
        />
      )}
    </Flex>
  );
};

const ProductDetails = ({ title, author, price }) => {
  console.log(title, author, price);

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">
        Name: {title}
      </Text>
      <Text fontSize="md" mt={2}>
        By: {author}
      </Text>
      <Text fontSize="lg" mt={4}>
        Price: {price}
      </Text>
    </Box>
  );
};

export default MyForm;
