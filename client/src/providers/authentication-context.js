import React from 'react'
// import { login, logout, isAuthenticated } from "../services/authentication";


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

  const signinRedirectCallback = () => {
    window.location.replace('http://localhost:9000/login');
  }

  const signinRedirect = () => {

  };
  
  const signinSilentCallback = () => {

  };
  
  const logout = () => {
    window.location.replace('http://localhost:9000/logout');
  }
  
  const isAuthenticated = () => {
   return true; 
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