import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export default function UserContextProvider(props) {

    let [isLogin, setLogin] = useState(null);
    let [isSignupMessage, setSignupMessage] = useState(null);
    // let [isLogout, setLogout] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('userToken') !== null) {
            setLogin(localStorage.getItem('userToken'));
        }
    });

    return <userContext.Provider value={{isLogin, setLogin, isSignupMessage, setSignupMessage}}>
        {props.children}
    </userContext.Provider>
}