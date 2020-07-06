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
  const context = React.useContext(AuthenticationContext);git config --global user.email "git config --global user.email "
  if (!context) {
    throw new Error(`useAuthentication must be used within a AuthenticationProvider`);
  }

  const authenticationCallback = (cb) => {
    const secureResource = localStorage.getItem('secureResource') || "/";
    localStorage.removeItem('secureResource');
    cb(secureResource);
  }

  const signIn = () => {
    const url = new URL(window.location.href);
    localStorage.setItem('secureResource', url.pathname)
    window.location.replace('http://localhost:9000/login');
  };
    
  const signOut = () => {
    window.location.replace('http://localhost:9000/logout');
  }
  
  const isAuthenticated = () => {
    const authorizationCookie = Cookie.getJSON("authorization");
    return !!authorizationCookie; 
  }

  return {
    authenticationCallback,
    signIn,
    signOut,
    isAuthenticated
  };
}

export { AuthenticationProvider, useAuthentication }