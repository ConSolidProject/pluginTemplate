import React, { useEffect, useState } from "react";
import { getProjectResourcesByStakeholder } from "../functions";
import { Typography } from "@material-ui/core";
import ResourceOverview from "../components/ResourceOverview";
import {useQuery} from 'react-query'

export default function StakeholderMapping({ sharedProps }) {
  const { projects, session, setActiveResources, activeResources } = sharedProps;
  const [resources, setResources] = useState([])
  const project = projects[0]

  useEffect(() => {
    getProjectResourcesByStakeholder(project, session).then(res => setResources(res))
  }, [activeResources])

  return (
    <div>
      {Object.keys(resources).map((item) => {
        return (
          <div style={{marginBottom: 20}} key={item}>
            <Typography>{item}: </Typography>
            {resources[item].map((res) => {
              return (
                <div key={res.metadata}>
                      <ResourceOverview
                        dataset={res}
                        activeResources={activeResources}
                        setActiveResources={setActiveResources}
                      />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
