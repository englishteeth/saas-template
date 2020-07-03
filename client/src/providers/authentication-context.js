import React from 'react'
import Cookie from "js-cookie"

const AuthenticationContext = React.createContext();

const AuthenticationProvider = ({children}) => {
  const [user, setUser] = React.useState({})
  const value = React.useMemo(() => [user, setUser], [user])
  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

function useAuthentication() {
  const context = React.useContext(AuthenticationContext);
  if (!context) {
    throw new Error(`useAuthentication must be used within a AuthenticationProvider`);
  }

  const signinRedirectCallback = (cb) => {
    console.log("callback");
    cb("/");
    // window.location.replace('/profile');
  }

  const signinRedirect = () => {
    window.location.replace('http://localhost:9000/login');
  };
  
  const signinSilentCallback = () => {

  };
  
  const logout = () => {
    window.location.replace('http://localhost:9000/logout');
  }
  
  /*
  ************************************************
  * How do we determine if we are authenticated?
  *
  * 1. Presence of the authorization cookie
  * 
  ************************************************
  */
  const isAuthenticated = () => {
    const authorizationCookie = Cookie.getJSON("authorization");
    console.log(authorizationCookie);
    return !!authorizationCookie; 
  }

  const [user, setUser] = context;

  return {
    user, 
    setUser,
    signinRedirectCallback,
    signinRedirect,
    signinSilentCallback,
    logout,
    isAuthenticated
  };
}

export { AuthenticationProvider, useAuthentication }