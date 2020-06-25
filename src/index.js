import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/css/argon-design-system-react.css";

import { Routes } from "./routes/Routes";

ReactDOM.render(
  <BrowserRouter children={Routes} basename={"/"} />,
  document.getElementById("root")
);