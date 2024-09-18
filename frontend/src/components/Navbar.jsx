import { Container, Flex, Button,Text, Link, HStack, useColorMode,  } from "@chakra-ui/react";
import React from "react";
import {PlusSquareIcon} from '@chakra-ui/icons' 
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
const Navbar = () => {
  const {colorMode , toggleColorMode} = useColorMode();
  return (
    <Container px={4} maxW={"1140px"} >
      <Flex
        h={16}
        alignitems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip="text"
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textAlign={"center"}
          textTransform={"uppercase"}
        >
          <Link href={"/"}>Product Store</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link href={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>{colorMode === "light"?<IoMoon size={20}/>:<LuSun size={20}/>}

          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
