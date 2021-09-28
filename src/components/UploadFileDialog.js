import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  DialogContentText,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import mime from "mime-types";
import { update, checkExistence, uploadResource, createResource } from "consolid";
import { createGlobalArtefactsFromGltf } from "../functions";
const typeExtensions = {
  graph: ["ttl", "rdf"],
  ifc: ["ifc"],
};

const UploadFileDialog = (props) => {
  const { session, currentProject } = props;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(null);
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [createNew, setCreateNew] = useState(false);
  const [gltfQuestion, setGltfQuestion] = useState(false);
  const [gltfChecked, setGltfChecked] = useState(false);
  const [error, setError] = useState(null);

  function handleInput(e) {
    e.preventDefault();
    console.log(`e.target.files[0]`, e.target.files[0]);
    let mimeType = mime.lookup(e.target.files[0].name);
    if (mimeType = "model/gltf+json") {
      setGltfQuestion(true);
    }
    setFile(e.target.files[0]);
  }

  async function uploadInput() {
    try {
      setLoading(true);
      // naive assumption that there are no other "." in the filename. Does not really matter anyway
      const datasetName = file.name.split(".")[0];
      let mimeType = mime.lookup(file.name);
      if (mimeType === false) {
        // set default mimetype
        mimeType = "text/plain";
      }

      // check if resource with this name already exists
      const exists = await checkExistence(
        `${props.currentProject.local}/${file.name}`,
        session
      );
      if (exists) {
        throw Error("A resource with this name already exists!");
      }
      // create and upload metadata file
      const metaResource = `${props.currentProject.local}/${file.name}.props.ttl`;
      const query = `  
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> 
  
    INSERT DATA {
      <${
        props.currentProject.local
      }${datasetName}> a <http://www.w3.org/ns/dcat#Dataset> ;
      <http://purl.org/dc/terms/title> "${description}"@en ;
      <http://www.w3.org/ns/dcat#keyword> "${label}"@en ;
      <http://purl.org/dc/terms/creator> <${session.info.webId}> ;
      <http://purl.org/dc/terms/issued> "${new Date().toISOString()}"^^xsd:dateTime ;
      <http://purl.org/dc/terms/modified> "${new Date().toISOString()}"^^xsd:dateTime ;
      <http://www.w3.org/ns/dcat#distribution> <${props.currentProject.local}${file.name}>.

  <${props.currentProject.local}${file.name}> a <http://www.w3.org/ns/dcat#Distribution>;
      <http://purl.org/dc/terms/title> "${mimeType} distribution of dataset: ${description}";
      <http://www.w3.org/ns/dcat#downloadURL> <${props.currentProject.local}${file.name}>;
      <http://www.w3.org/ns/dcat#mediaType> <https://www.iana.org/assignments/media-types/${mimeType}> .
    }`;

      await update(query, metaResource, session);
      await uploadResource(
        `${props.currentProject.local}${file.name}`,
        file,
        { mimeType },
        session
      );
        const linkElementResource = `${props.currentProject.local}${file.name}.linkelements.ttl`
        const q3 = `
        INSERT DATA {
          <${props.currentProject.local}${file.name}> <https://lbdserver.org/vocabulary#hasLinkElementRegistry> <${linkElementResource}> .
        }`
        await update(q3, metaResource, session)
        await createResource(linkElementResource, {mimeType: "text/turtle"}, session);


      if (gltfQuestion && gltfChecked) {
        await createGlobalArtefactsFromGltf(currentProject, `${props.currentProject.local}${file.name}`, linkElementResource, session)
      }
      setLoading(false);

      props.onClose()
    } catch (error) {
      setLoading(false);

      console.log(error);
      setError(error.message);
    }
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
        // style={{width: 400, height: 500}}
      >
        <DialogTitle id="form-dialog-title">Upload a resource</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upload a resource to your project vault.
          </DialogContentText>
        </DialogContent>
        <TextField
          style={{ margin: 10 }}
          variant="standard"
          type="file"
          onChange={handleInput}
        />
        <TextField
          style={{ margin: 10 }}
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label={"Description"}
        />
        <TextField
          style={{ margin: 10 }}
          variant="standard"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          label={"Label"}
        />
        <DialogActions>
          {gltfQuestion ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={gltfChecked}
                  onChange={() => setGltfChecked((prev) => !prev)}
                  color="primary"
                />
              }
              label="Create global identifiers for GLTF"
            />
          ) : (
            <p></p>
          )}

          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={uploadInput}
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon fontSize="large" />}
            disabled={(!file && !createNew) || loading}
          >
            Upload
            {loading && <CircularProgress size={20} />}{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

async function convertIFC(file, type, baseUri) {
  const formData = new FormData();
  formData.append("ifcFile", file, file.name);

  if (baseUri) {
    formData.append("baseUri", baseUri);
  }

  const response = await axios.post(`http://localhost:4800/${type}`, formData, {
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("response.data", response.data);
  const toFile = new File([response.data], "conversion.ttl");
  console.log("file", toFile);
  return toFile;
}

export default UploadFileDialog;
