import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import ColorModeSwitch from "../components/ColorModeSwitch";


const Layout = () => (
  <>
    <NavBar/>
    <Box padding={5}>
      <Outlet />
    </Box>
    <Flex justifyContent={{base:'end', md:'end'}}>
      <ColorModeSwitch/>
    </Flex>
  </>
);

export default Layout;