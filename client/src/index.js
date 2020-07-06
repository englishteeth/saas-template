import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { AuthenticationProvider } from "./providers/authentication-context";
import { Routes } from "./routes/Routes";

ReactDOM.render(
  <AuthenticationProvider>
    <BrowserRouter children={Routes} basename={"/"} />
  </AuthenticationProvider>,
  document.getElementById("root")
);