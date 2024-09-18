import React, { useEffect } from "react";
import {
  VStack,
  Text,
  Container,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
const HomePage = () => {
  const { products, fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r,cyan.400,blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>
        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            color={"gray.500"}
            textAlign={"center"}
          >
            No Products found{" "}
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a Product
              </Text>
            </Link>
          </Text>
        )}

      </VStack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;
