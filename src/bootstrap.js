import React from "react";
import ReactDOM from "react-dom";
import App from './App'

const mount = (el) => {
  ReactDOM.render(<App/>, el);
};

// if there is a div with the unique id (see public/index.html)
// there cannot be a div element with this id anywhere else! (therefore we're trying to make that as unique as possible)
const el = document.querySelector("#a4fead9a-19b3-4663-aecd-b7854874ea34");
if (el) {
  // we are running the project in isolation
  mount(el);
}

export { mount };
