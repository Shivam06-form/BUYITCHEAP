import React, { useState } from 'react'

const AuthContext= React.createContext({
    token:'',
    isLoggedIn: false,
    login: (token)=>{},
    logout: (token)=>{},
});


export const AuthContextProvider=(props)=>{
const initialToken = localStorage.getItem('token')
     const [token, settoken] = useState(initialToken)

     const userIsLoggedIn = !!token;

     const loginHandler =(token)=>{
         settoken(token)
         localStorage.setItem('token',token);
    }
    
    const logoutHandler =()=>{
    settoken(null)
    localStorage.removeItem('token')
    }

    const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
}
    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;