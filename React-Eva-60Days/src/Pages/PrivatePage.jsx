import { useContext } from "react";
import { AuthContext } from "../Components/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivatePage = (props) =>{
    const {isLogged} = useContext(AuthContext);

    return (!isLogged.isAuthenticated ? <Navigate to="/login"/> : props.children)

}