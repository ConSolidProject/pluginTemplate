import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Isolated from "./isolatedComponents/";

const packageJSON = require("../package.json");

const mount = (el, props, Wrapped) => {
  let Application;

  if (!Wrapped) {
    let pr = {};
    if (props) pr = props;
    Application = <App {...pr} />;
  } else {
    Application = <Wrapped />;
  }

  ReactDOM.render(Application, el);
};

// we are running the project in isolation
// if there is a div with the unique id (see public/index.html) (ASSUMPTION!)
// there cannot be a div element with this id anywhere else! (therefore we're trying to make that as unique as possible)
const el = document.querySelector("#_plugindemo");
if (el) {

  // look at StandaloneApp
  mount(el, {}, Isolated)
}

export default mount;
