import React from "react";
import ReactDOM from "react-dom";

import Myrouter from "./Router/index";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Myrouter />
  </React.StrictMode>,
  rootElement
);
