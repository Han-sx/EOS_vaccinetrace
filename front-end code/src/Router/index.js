import React from "react";

import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Login from "../Login";
import LayoutIndex from "../Layout/LayoutIndex";
import Manufacturer from "../Layout/Manufacturer";
import Transporter from "../Layout/Transporter";
import Inoculation from "../Layout/Inoculation";
import Guest from "../Layout/Guest";

export default class MyRoute extends React.Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Route exact path="/" component={Login} />
        <Route exact path="/View" component={LayoutIndex} />
        <Route exact path="/Manufacturer" component={Manufacturer} />
        <Route exact path="/Transporter" component={Transporter} />
        <Route exact path="/Inoculation" component={Inoculation} />
        <Route exact path="/Guest" component={Guest} />
      </Router>
    );
  }
}
