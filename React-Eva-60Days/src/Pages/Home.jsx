import {
  Container,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Grid,
  GridItem,
  Select,
  Box
} from "@chakra-ui/react";
import { Loading } from "../Components/Loading";
import { Error } from "../Components/Error";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [sortData, setSortData] = useState("");
  const [filterData, setFilterData] = useState("");
  const [item, setItem] = useState([]);

  async function fetchData(sortData, filterData) {
    setLoad(true);
    try {

        let queryData = {};

        if(filterData){
            queryData.filter = filterData
        }

        if(sortData){
            queryData.sort = "price",
            queryData.order = sortData
        }

      let res = await axios({
        method: "get",
        url: "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products",
        params: queryData
      });
      console.log(res.data.data);
      setItem(res.data.data);
      setLoad(false);
      console.log(queryData);
    } catch (error) {
      setLoad(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData(sortData, filterData);
  }, [sortData, filterData]);

  if (load) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Container bg="red.200" maxW="6xl">
        <Heading textAlign="center">Home Page</Heading>

        <Box>
            <Select placeholder="Sort by Price" value={sortData} onChange={(e)=> setSortData(e.target.value)}>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
            </Select>
        </Box>

        <Box>
            <Select placeholder="Filter by Category" value={filterData} onChange={(e)=> setFilterData(e.target.value)}>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="homedecor">Home Decor</option>
            </Select>
        </Box>

      <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }} gap={6} py={10}>
        {item.map((ele) => (
          <GridItem key={ele.id}>
            <Card maxW="sm">
              <CardBody>
                <Image src={ele.image} borderRadius="lg" />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{ele.title}</Heading>
                  <Text>
                    Category:
                    {ele.category}
                  </Text>
                  <Text color="blue.600" fontSize="2xl">
                    {ele.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                    <Link to={`/productDetails/${ele.id}`}>
                    <Button variant="solid" colorScheme="blue">
                    More Details
                  </Button>
                    </Link>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};
