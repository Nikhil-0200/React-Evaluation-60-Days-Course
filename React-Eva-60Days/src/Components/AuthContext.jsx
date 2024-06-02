import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) =>{
    const [isLogged, setIsLogged] = useState({
        isAuthenticated: false,
        token: null,
        email: null,
    })

    function Login(token, email){
        setIsLogged({
            isAuthenticated: true,
            token: token,
            email: email,
        })
    }

    function Logout(){
        setIsLogged({
            isAuthenticated: false,
            token: null,
            email: null,
        })
    }

    const sendData = {isLogged, Login, Logout} 

    return(
        <AuthContext.Provider value={sendData}>
            {props.children}
        </AuthContext.Provider>
    )
}