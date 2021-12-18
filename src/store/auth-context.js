import React, {useEffect, useState} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout : () => {},
    onLogin : (email, password) => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const userLoginInfo = localStorage.getItem('isLoggedIn');

        if(userLoginInfo === '1'){
            setLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setLoggedIn(false)
    }
    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setLoggedIn(true);
    }
    return (
        <AuthContext.Provider
        value = {{isLoggedIn : isLoggedIn, onLogin : loginHandler, onLogout : logoutHandler}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;