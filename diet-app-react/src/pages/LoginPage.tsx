import { Box } from "@chakra-ui/react"
import ColorModeSwitch from "../components/ColorModeSwitch"
import LoginForm from "../components/LoginForm"

const LoginPage = () => {
  return (
    <Box>
       <ColorModeSwitch/>
       <LoginForm/>
    </Box>
    
  )
}


export default LoginPage