import { Box } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";
import { useProductStore } from "./store/product";
function App() {
  const products= useProductStore();
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/create" element={<CreatePage/>}/>

        </Routes>
      </Box>
    </>
  )
}

export default App
