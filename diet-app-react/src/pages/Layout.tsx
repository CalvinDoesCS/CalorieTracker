import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import ColorModeSwitch from "../components/ColorModeSwitch";

const Layout = () => (
  <>
    <ColorModeSwitch/>
    <Box padding={5}>
      <Outlet />
    </Box>
  </>
);

export default Layout;