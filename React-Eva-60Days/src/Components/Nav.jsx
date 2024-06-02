import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const Nav = () => {
  const { isLogged, Logout } = useContext(AuthContext);

  function handleLogout(){
    Logout()
  }

  return (
    <Box bg="aqua" w="100%" h="80px" fontSize="xl" fontWeight="bold">
      <Flex px={100} py={6} gap={10}>
        <Box>
          <Text>{isLogged.email}</Text>
        </Box>
        <Box>
          <Link to="login">Login</Link>
        </Box>
        <Spacer />
        <Box>
          <Flex gap={10}>
            <Link to="/">Home</Link>
            <Button onClick={handleLogout}>Logout</Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
