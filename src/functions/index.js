import { getStakeholdersFromProject, getProjectId, getLBDlocation, getProjectDataFromStakeholder, findProjectRepository, findResourcesInRepository, update } from "consolid";
import { QueryEngineComunicaSolid } from "graphql-ld-comunica-solid";
import {v4} from 'uuid'

const newEngine = require("@comunica/actor-init-sparql").newEngine;

async function getProjectResourcesByStakeholder(project, session) {
  try {
    const response = {}
    // find all stakeholders
    const stakeholders = await getStakeholdersFromProject(project, session);
    const projectId = await getProjectId(project);
    const promises = stakeholders.map((st) => {
      return getProjectDataFromStakeholder(st, projectId, session);
    });

    let resolution = await Promise.all(promises);
    resolution.forEach((el) => response[el.stakeholder] = el.data )
    return response;
  } catch (error) {
    console.log("error getting", error);
    throw error;
  }
}

async function getMetadataByStakeholder(st, projectId, myEngine, session) {
  const lbd = await getLBDlocation(st);
  const projectRepository = await findProjectRepository(lbd, projectId);
  const resources = await findResourcesInRepository(
    projectRepository,
    myEngine
  );
  const prom = resources.map((res) => findDistribution(res, myEngine, session));
  const resp = await Promise.all(prom);
  return {stakeholder: st, resources: resp.filter((v) => v !== undefined)};
}

async function findDistribution(metadata, myEngine, session) {
  const q = `
    prefix ldp: <http://www.w3.org/ns/ldp#>
    prefix dcat: <http://www.w3.org/ns/dcat#> 
    prefix lbd: <https://lbdserver.org/vocabulary#>
    select ?url ?ler
    where 
    {
      ?dataset a dcat:Dataset ; 
        dcat:distribution ?dist .
      ?dist dcat:downloadURL ?url ;
       lbd:hasLinkElementRegistry ?ler .
    }`;
  const results = await myEngine.query(q, { sources: [metadata] });
  
  const distributions = {}
  // results.results.bindings.map((res) => {return {url: res.url.value, linkElementRegistry: res.ler.value}});
    results.results.bindings.forEach((item) => {
      if (!Object.keys(distributions).includes(item.url.value)) {
        distributions[item.url.value] = [item.ler.value]
      } else {
        distributions[item.url.value].push(item.ler.value)
      }
    })
  
  const distList = Object.keys(distributions).map((item) => {
    return {url: item, linkElementRegistry: distributions[item]}
  })

  if (distList.length > 0) {
    return {
      distributions: distList
        .filter((dist) => dist.url && dist.url.length > 0)
        .map((d) => {
          return { uri: d.url, active: false, linkElementRegistry: d.linkElementRegistry };
        }),
      metadata: { uri: metadata, active: false },
    };
  }
}

async function alignGuids(session) {
  const myEngine = newEngine()
  const gltfResource = "http://localhost:5000/jeroen/lbd/642f0417-ce23-4d9d-8806-c078aed93ae1/architectural_duplex.gltf"
  const ttlSource = "http://localhost:5000/jeroen/lbd/642f0417-ce23-4d9d-8806-c078aed93ae1/architectural_duplex.ttl"
  const locRegistry = "http://localhost:5000/jeroen/lbd/642f0417-ce23-4d9d-8806-c078aed93ae1/artefactRegistry.ttl"

  const gltfRes = await fetch(gltfResource)
  const gltf = await gltfRes.json()

  let query = `
  PREFIX lbd: <https://lbdserver.org/vocabulary#>
  PREFIX loc: <${locRegistry}#>

  INSERT DATA { `

  for (const element of gltf.nodes) {
    if (element.name && element.name.length > 10) {

      const q = `
      prefix ldp: <http://www.w3.org/ns/ldp#>
      prefix dcat: <http://www.w3.org/ns/dcat#>
      prefix schema: <http://schema.org/> 
      prefix props: <https://w3id.org/props#>

      select ?element 
      where 
      { ?element props:globalIdIfcRoot ?root .
        ?root schema:value "${element.name}" .
      }`;

    const results = await myEngine.query(q, { sources: [ttlSource] });
    const bindings = await results.bindings()
    if (bindings.length > 0) {
      const el = bindings[0].get('?element').id
      const loc = v4()
      const le1 = v4()
      const le2 = v4()
      const id1 = v4()
      const id2 = v4()

      // create link elements for Gltf resource
     query += `
        loc:artefact_${loc} lbd:hasLinkElement loc:le_${le1}, loc:le_${le2} .
        loc:le_${le1} lbd:hasDocument <${gltfResource}> ;
            lbd:hasIdentifier loc:identifier_${id1} .
        loc:identifier_${id1} lbd:identifier "${element.name}" ; a lbd:StringBasedIdentifier .

        loc:le_${le2} lbd:hasIdentifier loc:identifier_${id2} ;
          lbd:hasDocument <${ttlSource}> .
        loc:identifier_${id2} a lbd:URIBasedIdentifier ;
           lbd:identifier <${el}> .
      ` 
    }}
  }

  query += ' } '
  await update(query, locRegistry, session)
}

async function createGlobalArtefactsFromGltf(project, gltfResource, linkElementResource, session) {
  const gltfRes = await fetch(gltfResource)
  const gltf = await gltfRes.json()
  for (const element of gltf.nodes) {
    if (element.name && element.name.startsWith("Brep")) {
      const globRegistry = project.replace('profile/card#me', 'data/artefactRegistry.ttl')

      const glob = v4()
      const le1 = v4()
      const id1 = v4()

      // const queryLocalArtefactRegistry = `
      // PREFIX lbd: <https://lbdserver.org/vocabulary#>
      // PREFIX art: <${artefactRegistryUrl}#>
      // PREFIX owl: <http://www.w3.org/2002/07/owl#>
      // PREFIX omg: <https://w3id.org/omg#>
      // PREFIX fog: <https://w3id/fog#>
      // PREFIX dct: <http://purl.org/dc/terms/>
      // PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      // PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      // PREFIX glob: <${globRegistry}#>

      // INSERT DATA {
      //   glob:artefact_${glob} lbd:hasLinkElement art:le_${le1} .
      //   art:le_${le1} lbd:hasDocument <${gltfResource}> .
      // }`
      // await update(queryLocalArtefactRegistry, artefactRegistryUrl, session)

      const queryGltfProps = `
      PREFIX lbd: <https://lbdserver.org/vocabulary#>
      PREFIX loc: <${linkElementResource}#>

      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX omg: <https://w3id.org/omg#>
      PREFIX fog: <https://w3id/fog#>
      PREFIX dct: <http://purl.org/dc/terms/>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      PREFIX glob: <${globRegistry}#>

      INSERT DATA {
        glob:artefact_${glob} lbd:hasLinkElement loc:le_${le1} .
        loc:le_${le1} lbd:hasIdentifier loc:identifier_${id1} ;
          lbd:hasDocument <${gltfResource}> .
        loc:identifier_${id1} lbd:identifier "${element.name}" .
      }`
      await update(queryGltfProps, linkElementResource, session)

      const queryGlobalArtefactRegistry = `
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX glob: <${globRegistry}#>
      PREFIX dct: <http://purl.org/dc/terms/>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX dcat: <http://www.w3.org/ns/dcat#>

      INSERT DATA {
        glob:artefact_${glob} dct:isReferencedBy <${linkElementResource}> .
      }`
      await update(queryGlobalArtefactRegistry, globRegistry, session)
    }}
  
}

function getGuid(gltfGuid) {
  var guidChars = [["0", 10], ["A", 26], ["a", 26], ["_", 1], ["$", 1]].map(function (a) {
      var li = [];
      var st = a[0].charCodeAt(0);
      var en = st + a[1];
      for (var i = st; i < en; ++i) {
          li.push(i);
      }
      return String.fromCharCode.apply(null, li);
  }).join("");

  var b64 = function (v, len) {
      var r = (!len || len == 4) ? [0, 6, 12, 18] : [0, 6];
      return r.map(function (i) {
          return guidChars.substr(parseInt(v / (1 << i)) % 64, 1)
      }).reverse().join("");
  };

  var compressGuid = function (g) {
      g = g.replace(/-/g, "");
      var bs = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30].map(function (i) {
          return parseInt(g.substr(i, 2), 16);
      });
      return b64(bs[0], 2) + [1, 4, 7, 10, 13].map(function (i) {
          return b64((bs[i] << 16) + (bs[i + 1] << 8) + bs[i + 2]);
      }).join("");
  };

  let uncompressed = gltfGuid.split("-")
  let uncompressed_string = ''
  uncompressed.forEach((p, id) => {
      if (0 < id && id < uncompressed.length - 2) {
          uncompressed_string += p + '-'
      } else if (id === uncompressed.length - 2) {
          uncompressed_string += p
      }
  })
  const id = compressGuid(uncompressed_string)
  return id
}


export {getProjectResourcesByStakeholder, alignGuids, createGlobalArtefactsFromGltf}