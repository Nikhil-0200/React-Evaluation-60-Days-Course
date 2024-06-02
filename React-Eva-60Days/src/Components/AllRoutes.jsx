import {Routes, Route} from "react-router-dom";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { Product_Details } from "../Pages/Product_Details";
import { PrivatePage } from "../Pages/PrivatePage";


export const AllRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={
            <PrivatePage>
            <Home/>    
            </PrivatePage>
            }/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/productDetails/:id" element={
            <PrivatePage>
            <Product_Details/>
            </PrivatePage>
            }/>
        </Routes>
    )
}

