import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { Loading } from "../Components/Loading";
import { Error } from "../Components/Error";
import axios from "axios";

export const Product_Details = () =>{
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
  const [item, setItem] = useState({});
  const toast = useToast()
    const {id} = useParams()

    
  async function fetchData(id) {
    setLoad(true);
    try {

      let res = await axios({
        method: "get",
        url: `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products/${id}`,
      });

      console.log(res.data.data);
      setItem(res.data.data);

      setLoad(false);
    } catch (error) {
      setLoad(false);
      setError(true);
    }
  }

  
  useEffect(() => {
    fetchData(id);
  }, [id]);

  if (load) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  function handleClick(){

    if(confirm("Are you sure you want to add this item to cart")){
        toast({
            title: 'Item added to cart',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
    }
  }

  const {title, image, price, category, brand} = item

    return(
        <div>
            <img src={image} alt="image" />
            <p>Title: {title}</p>
            <p>Category: {category}</p>
            <p>Brand: {brand}</p>
            <p>Price: {price}</p>
            <Button onClick={handleClick}>Add to Cart</Button>
        </div>
        
    )
}