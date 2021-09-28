import React from "react";
import { FormControl, FormGroup, FormControlLabel, Switch } from "@material-ui/core";

export default function ResourceOverview(props) {
    const {dataset, setActiveResources, activeResources} = props
    const {artefactRegistry, accessRights, metadata, main} = dataset
    function handleChange(e) {
      const ar = activeResources.map((r) => r.main)
      if (!ar.includes(main)) {
        setActiveResources([...activeResources, dataset])
    } else {
        const newArray = activeResources.filter((value, i, arr) => {
          return value.main !== main;
        });
        setActiveResources(newArray);
      }
    }
  
  
    return (
      <div style={{ marginLeft: 25 }}>
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={activeResources.map((r) => r.main).includes(main)}
                  onChange={handleChange}
                  color="primary"
                />
              }
              color="primary"
              // label={`${parse(props.resource.metadata)["rdfs:label"]} (${props.info.type})`}
              label={main.split('/')[main.split('/').length -1]}
            />
          </FormGroup>
        </FormControl>
      </div>
    );
  }