import JSZip from "jszip";
const N3 = require("n3");
const { DataFactory } = N3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;
const { container, linkSet } = require("./ontologies");
const v4 = require("uuid");
const { newEngine } = require("@comunica/actor-init-sparql");
const { getProjectResourcesByStakeholder } = require("./index");

const prefixes = `
@prefix ct: <http://www.iso-icdd.org/draft/Container.rdf#> .
@prefix ls: <http://www.iso-icdd.org/draft/LinkSet.rdf#> .
@prefix j.0: <http://www.iso-icdd.org/draft/DynamicSemantics.rdf#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .`;

const sparqlPrefixes = `
prefix ct: <http://www.iso-icdd.org/draft/Container.rdf#> 
prefix j.0: <http://www.iso-icdd.org/draft/DynamicSemantics.rdf#> 
prefix owl: <http://www.w3.org/2002/07/owl#> 
prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
prefix xml: <http://www.w3.org/XML/1998/namespace> 
prefix xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX lbd: <https://lbdserver.org/vocabulary#>
PREFIX dct:  <http://purl.org/dc/terms/>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
 `;

export default async function getICDD(project, session) {
  const parser = new N3.Parser();
  const store = new N3.Store();
  return new Promise(async (resolve, reject) => {
    const zip = new JSZip();

    // generate index.ttl
    const index_ttl = await createICDDindex(store, parser, project, session);
    zip.file("index.ttl", index_ttl);

    // generate ontology resources
    const ontologyResources = zip.folder("Ontology resources");
    ontologyResources.file("Linkset.ttl", linkSet);
    ontologyResources.file("Container.ttl", container);

    // generate payload documents
    const payloadDocuments = zip.folder("Payload documents");
    const documents = await getPayloadDocuments(project, session);
    for (const document of documents) {
      const blob = await document.blob();
      payloadDocuments.file(
        document.url.split("/")[document.url.split("/").length - 1],
        blob
      );
    }

    // generate payload triples
    const payloadTriples = zip.folder("Payload triples");
    const content_ttl = await createPayloadTriples(
      store,
      parser,
      project,
      session
    );
    payloadTriples.file("content.ttl", content_ttl);

    // img.file("smile.gif", "", {base64: true});

    zip.generateAsync({ type: "blob" }).then(function (content) {
      resolve(content);
    });
  });
}

async function createICDDindex(store, parser, project, session) {
  const projectName = project.global.replace(
    "/profile/card#me",
    "/data/index.ttl#"
  );

  const linkset = v4();
  const myEngine = newEngine();
  // prefix : needs to change (is placeholder)

  // parse linkset
  await parseData(
    prefixes +
      `
        @prefix : <${projectName}> .

        :linkset_${linkset} a ct:Linkset ;
        ct:filename "content.rdf" ;
        j.0:creationDate "${new Date().toISOString()}"^^xsd:dateTime .`,
    store,
    parser,
    namedNode(projectName)
  );

  const perStakeholder = await getProjectResourcesByStakeholder(
    project,
    session
  );
  const projectDocuments = Object.keys(perStakeholder)
    .map((stakeholder) => {
      if (perStakeholder[stakeholder].length > 0) {
        const files = perStakeholder[stakeholder];

        return files.flat();
      }
    })
    .flat()
    .filter(function (element) {
      return element !== undefined;
    });

  // parse containerdescription
  for (const resource of projectDocuments) {
    for (const dist of resource.distributions) {
      const q =
        sparqlPrefixes +
        `
            prefix : <${projectName}> 

            SELECT ?title ?mt
            WHERE {
                <${dist.uri}> dct:title ?title ;
                    dcat:mediaType ?mt ;
            }`;

      const res = await myEngine.query(q, { sources: [resource.metadata.uri] });
      const bindings = await res.bindings();
      if (bindings.length > 0) {
        const main = bindings[0];
        const title = main.get("?title").id;
        const mt = main.get("?mt").id;
        const data = `<${projectName}> ct:containsDocument <${dist.uri}> .
                <${dist.uri}> ct:format "${mt.replace(
          "https://www.iana.org/assignments/media-types/",
          ""
        )}" ;
                    ct:description ${title} ;
                    ct:name "${
                      dist.uri.split("/")[dist.uri.split("/").length - 1]
                    }" .
                `;
        await parseData(prefixes + data, store, parser, namedNode(projectName));
      }
    }
  }

  const result = await serializeData(store, namedNode(projectName));
//  myEngine.invalidateHttpCache()

  return result;
}

async function createPayloadTriples(store, parser, project, session) {
  const perStakeholder = await getProjectResourcesByStakeholder(
    project,
    session
  );
  const projectDocuments = Object.keys(perStakeholder)
    .map((stakeholder) => {
      if (perStakeholder[stakeholder].length > 0) {
        const files = perStakeholder[stakeholder];

        return files.flat();
      }
    })
    .flat()
    .filter(function (element) {
      return element !== undefined;
    });

    const promisify = []
  for (const doc of projectDocuments) {
    for (const dist of doc.distributions) {
        promisify.push(getLinkElementsOfDistribution(dist, project, store, parser))
  }}

  await Promise.all(promisify)

  const projectName = project.global.replace(
    "/profile/card#me",
    "/data/content.ttl#"
  );
  const result = await serializeData(store, namedNode(projectName));
  return result;
}

async function getPayloadDocuments(project, session) {
  const perStakeholder = await getProjectResourcesByStakeholder(
    project,
    session
  );
  const projectDocuments = Object.keys(perStakeholder)
    .map((stakeholder) => {
      if (perStakeholder[stakeholder].length > 0) {
        const files = perStakeholder[stakeholder];

        return files.flat();
      }
    })
    .flat()
    .filter(function (element) {
      return element !== undefined;
    });

  const files = [];
  for (const doc of projectDocuments) {
    for (const dist of doc.distributions) {
      const file = await fetch(dist.uri);
      files.push(file);
    }
  }

  return files;
}

function getLinkElementsOfDistribution(dist, project, store, parser) {
    return new Promise(async (resolve, reject) => {
        try {
            const myEngine = newEngine();
            const projectName = project.global.replace(
              "/profile/card#me",
              "/data/content.ttl#"
            );
            const q =
              sparqlPrefixes +
              `
                  prefix : <${projectName}> 
                  SELECT  ?art ?le ?identifier ?id
                  WHERE {
                      ?art lbd:hasLinkElement ?le . 
                      ?le lbd:hasIdentifier ?identifier .
                      ?identifier lbd:identifier ?id .
                  }
                  `;
            const results = await myEngine.query(q, {
              sources: dist.linkElementRegistry,
            });
      
            results.bindingsStream.on("data", async (b) => {
              const art = b.get("?art").id;
              const le = b.get("?le").id;
              const identifier = b.get("?identifier").id;
              const idValue = b.get("?id").id;
              let input
              if (idValue.startsWith('"')) {
                input = prefixes + `
                @prefix : <${projectName}> .
                
                <${art}> a ls:Link ;
                    ls:hasLinkElement <${le}> .
                <${le}> a ls:LinkElement ;
                    ls:hasDocument <${dist.uri}> ;
                    ls:hasIdentifier <${identifier}> .
                <${identifier}> ls:identifier ${idValue};
                    a ls:StringBasedIdentifier.
                `
              } else {
                input = prefixes + `
                @prefix : <${projectName}> .
                
                <${art}> a ls:Link ;
                    ls:hasLinkElement <${le}> .
                <${le}> a ls:LinkElement ;
                    ls:hasDocument <${dist.uri}> ;
                    ls:hasIdentifier <${identifier}> .
                <${identifier}> ls:identifier <${idValue}>;
                    a ls:URIBasedIdentifier.
                `
              }
              await parseData(input, store, parser, namedNode(projectName));
    
          })
      
          results.bindingsStream.on('end', () => {
            resolve()
          })
        } catch (error) {
            console.log(`get link elements error`, error)
            reject(error)
        }
    })
}

function parseData(data, store, parser, graph) {
  return new Promise((resolve, reject) => {
      if (data) {
        parser.parse(data, (error, q, prefixes) => {
            // if (error) {
                // console.log("pliplipli")
            //   console.log("error parsing: ", error);
            //   reject(error);
            // }
            if (q) {
              const myQuad = quad(q.subject, q.predicate, q.object, graph);
              store.addQuad(myQuad);
            } else {
              resolve();
            }
          });
      }
  });
}

function serializeData(store, graph) {
  return new Promise((resolve, reject) => {
    const writer = new N3.Writer();
    const quads = store.getQuads(null, null, null, graph);
    quads.forEach((q) => {
      const myQuad = quad(q.subject, q.predicate, q.object, null);

      writer.addQuad(myQuad);
    });

    writer.end((error, result) => {
      if (error) {
          console.log('error serializing', error);
          reject()
    };
      resolve(result);
    });
  });
}
