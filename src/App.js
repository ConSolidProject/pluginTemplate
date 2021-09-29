import React, {useEffect, useState} from "react";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
const newEngine = require('@comunica/actor-init-sparql').newEngine

const packageJSON = require('../package.json')

const generateClassname = createGenerateClassName({
  productionPrefix: packageJSON.name,
  seed: packageJSON.name,
});

export default (props) => {
  const {sharedProps, inactive} = props
  const {session, projects, activeResources} = sharedProps
 
  useEffect(() => {
    const myEngine = newEngine()
    const query = `Select * where {?s ?p ?o}`
    const results = myEngine.query(query, {sources: ["http://localhost:5000/jeroen/profile/card"]}).then(res => res.bindings()).then(b => console.log(b))
  }, [])

  if (inactive) return <></>
  return (
      <StylesProvider generateClassName={generateClassname}>
        <h3 style={{margin: 10}}>Resource overview</h3>
        <p>This is a template for your LBDserver/ConSolid plugin</p>
   </StylesProvider>
  );
};
