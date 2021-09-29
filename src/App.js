import React, {useEffect, useState} from "react";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import {update} from 'consolid'
const newEngine = require('@comunica/actor-init-sparql').newEngine

const packageJSON = require('../package.json')

const generateClassname = createGenerateClassName({
  productionPrefix: packageJSON.name,
  seed: packageJSON.name,
});

export default (props) => {
  const {sharedProps, inactive} = props
  const {projects, activeResources, trigger, setTrigger} = sharedProps
  const [session, setSession] = useState(getDefaultSession())

  useEffect(() => {
    setSession(() => getDefaultSession())
  }, [trigger])


  async function fetchData() {
    const q = "INSERT DATA {<s> <p> <o> .}"
    const graph = "http://localhost:5000/jeroen/lbd/642f0417-ce23-4d9d-8806-c078aed93ae1/artefactRegistry.ttl"
    await update(q, graph, getDefaultSession())
  }


  if (inactive) return <></>
  return (
      <StylesProvider generateClassName={generateClassname}>
        <div style={{margin:20, textAlign: "justify"}}>
        <Typography variant="h5">Plugin Template</Typography>
        <Typography variant="body1">This is a template for your LBDserver/ConSolid plugin. It is a federated LBDserver module, which means it can be used standalone as well as in a configuration alongside other plugins. Enjoy coding!</Typography>   
        <br/>   
        <Typography variant="body1">This module is exposed at:</Typography>
        <a target="_blank" href="https://consolidproject.github.io/pluginTemplate/">https://consolidproject.github.io/pluginTemplate/</a>    
        </div>
   </StylesProvider>
  );
};
