import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "../App";
import {
  projects as p,
  activeResources as sel,
  selectedElements as se,
  selectionId as sId,
  trigger as t,
} from "../atoms";
import { useRecoilState, RecoilRoot, useRecoilValue } from "recoil";
import IsolatedSideBar from "./Isolated";
import { QueryClientProvider, QueryClient } from "react-query";

const packageJSON = require("../../package.json");

export default function Isolated() {
  const module = {
    url: "http://example.org/remoteEntry.js", // can be safely changed
    scope: packageJSON.name, // don't change
    label: packageJSON.name, // can be safely changed
    module: "./index", // don't change
    dimensions: {
      // can be safely changed
      x: 0,
      y: 0,
      h: 850,
      w: 400,
    },
  };

  // if you want to include more in the standalone Application than in the federated module, you should change 'App' to a component with extra functionality (still with App as a child component, though...)

  return (
    <div style={{ width: module.dimensions.w, height: module.dimensions.h }}>
      <RecoilRoot>
        <QueryClientProvider client={new QueryClient()}>
          <IsolatedComponent module={module} />
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  );
}

const IsolatedComponent = (props) => {
  const [idp, setIdp] = useState("http://localhost:5000");
  const [currentUrl, setCurrentUrl] = useState("https://localhost:8081");
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  const Application = standaloneRunner(App, props.module);

  return (
    <div>
      <IsolatedSideBar />
      <Application />
    </div>
  );
};

function standaloneRunner(WrappedComponent, module) {
  return function Wrapped() {
    const [activeResources, setActiveResources] = useRecoilState(sel);
    const [selectedElements, setSelectedElements] = useRecoilState(se);
    const [projects, setProjects] = useRecoilState(p);
    const [selectionId, setSelectionId] = useRecoilState(sId);
    const [trigger, setTrigger] = useRecoilState(t);
    const sharedProps = {
      projects,
      setProjects,
      activeResources,
      setActiveResources,
      selectedElements,
      setSelectedElements,
      selectionId,
      setSelectionId,
      trigger,
      setTrigger
    };

    const children = null;
    const inactive = false;

    return (
      <WrappedComponent
        sharedProps={sharedProps}
        module={module}
        children={children}
        inactive={inactive}
      />
    );
  };
}
