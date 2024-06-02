import { Container, Input, Button, Heading, Flex, Box } from "@chakra-ui/react";
import { useEffect, useState,  useContext, useRef  } from "react";
import { Loading } from "../Components/Loading";
import { Error } from "../Components/Error";
import axios from "axios";
import { AuthContext } from "../Components/AuthContext";
import { Navigate } from "react-router-dom";

export const Login = () => {
//   const inputRef = useRef(null);
  const { isLogged, Login, Logout } = useContext(AuthContext);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  async function fetchData() {
    setLoad(true);
    try {
      let res = await axios({
        method: "post",
        url: "https://reqres.in/api/login",
        data: data,
      });
      console.log(res);

      if (res.status === 200) {
        Login(res.data.token, data.email);
      }

      setLoad(false);
    } catch (error) {
      setLoad(false);
      setError(true);
    }
  }

  if (isLogged.isAuthenticated === true) {
    return <Navigate to="/" />;
  }

  if (load) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  function handleLogin() {
    fetchData();
  }

  function handleChange(e) {
    const { name, value } = e.target;

    const newData = { ...data, [name]: value };

    setData(newData);
  }

//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

  return (
    <Container>
      <Flex flexDirection="column" gap={10}>
        <Heading textAlign="center">Login Page</Heading>
        <Box>
          <label>Email Id: </label>
          <Input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            // ref={inputRef}
          />
        </Box>

        <Box>
          <label>Password: </label>
          <Input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </Box>

        <Button onClick={handleLogin}>Login</Button>
      </Flex>
    </Container>
  );
};
