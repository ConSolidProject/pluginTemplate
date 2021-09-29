import React, {useEffect, useState} from "react";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
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
        <h3 style={{margin: 10}}>Resource overview</h3>
        <p>This is a template for your LBDserver/ConSolid plugin</p>
        <button onClick={() => fetchData()}>click</button>
        <p>{JSON.stringify(session.info)}</p>
   </StylesProvider>
  );
};
