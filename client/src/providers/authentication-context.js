import React from 'react'
import Cookie from "js-cookie"
import { nanoid } from 'nanoid'

const AuthenticationContext = React.createContext();

const AuthenticationProvider = ({children}) => {
  const [user, setUser] = React.useState({nonce: nonce()})
  const value = React.useMemo(() => [user, setUser], [user])
  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

const nonce = () => {
  if (!window.localStorage.getItem('nonce')) window.localStorage.setItem('nonce', nanoid());
  return window.localStorage.getItem('nonce')
}

function useAuthentication() {
  const context = React.useContext(AuthenticationContext);
  if (!context) {
    throw new Error(`useAuthentication must be used within a AuthenticationProvider`);
  }

  const signinRedirectCallback = (cb) => {
    const secureResource = localStorage.getItem('secureResource') || "/";
    localStorage.removeItem('secureResource');
    cb(secureResource);
  }

  const signinRedirect = () => {
    const url = new URL(window.location.href);
    localStorage.setItem('secureResource', url.pathname)
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