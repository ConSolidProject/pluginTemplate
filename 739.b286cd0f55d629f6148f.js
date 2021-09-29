"use strict";(self.webpackChunktemplate=self.webpackChunktemplate||[]).push([[739,733],{35733:(t,e,a)=>{a.r(e),a.d(e,{executeQuery:()=>d,getAuthorisedFilesInRepository:()=>E,getStakeholdersFromProject:()=>g,getProjectsFromAggregator:()=>f,getProjectDataFromStakeholder:()=>y,getLBDlocation:()=>j,getAccessRights:()=>b,update:()=>m,findObjectAliases:()=>W,getLocalContexts:()=>R,loadProjectMetadata:()=>w,getProjectId:()=>h});var n=a(95725);const r=a(99170),{DataFactory:s}=r,{namedNode:i,literal:o,defaultGraph:c,quad:l}=s;async function d(t,e,a){const r="\nprefix ldp: <http://www.w3.org/ns/ldp#> \nprefix lbd: <https://lbdserver.org/vocabulary#>\nprefix dcat: <http://www.w3.org/ns/dcat#>\nprefix owl: <http://www.w3.org/2002/07/owl#>\n"+t,s=new n.QueryEngineComunicaSolid;return await s.query(r,{sources:e})}async function u(t,e){const a={};for(const n of e)try{a[n]=t.results.bindings.map((t=>t[n].value)).filter((t=>null!=t))}catch(t){console.log("error",t)}return a}async function w(t,e,a){try{const n=await h(t),s=await g(t);for(const t of s){const s=await j(t)+n+"/artefactRegistry.ttl",i=await a.fetch(s),o=await i.text();if(o){const t=new r.Parser;await p(o,e,t,s+"#")}else console.log(t,"has no artefact registry")}return}catch(t){console.log("error",t)}}function p(t,e,a,n){return new Promise(((r,s)=>{t&&a.parse(t,((t,a,s)=>{if(a){let t=a.subject.id,r=a.predicate.id,s=a.object.id;a.subject.id.startsWith("#")&&(t=n+a.subject.id),a.predicate.id.startsWith("#")&&(r=n+a.predicate.id),a.object.id.startsWith("#")&&(s=n+a.object.id);const o=l(i(t),i(r),i(s),c());e.addQuad(o)}else r()}))}))}async function f(t,e){let a=t;a.endsWith("/")||(a+="/");const n=await d("\n  SELECT ?project WHERE {\n    ?s a lbd:Aggregator ;\n      lbd:aggregates ?project .\n  }",[a]),{project:r}=await u(n,["project"]);return r}async function h(t,e){return t.split("/")[t.split("/").length-2]}async function g(t,e){let a=t;a.endsWith("/")||(a+="/");const n=`\n  SELECT ?st WHERE {\n    <${t}> a lbd:PartialProject ;\n      lbd:hasMember ?st .\n  }`,r=await d(n,[t]),{st:s}=await u(r,["st"]);return s}async function y(t,e,a){const n=await j(t);e.endsWith("/")||(e+="/");const r=n+e;return{stakeholder:t,data:await E(r,a)}}async function E(t,e){const a=`\n    SELECT ?dataset WHERE {\n      <${t}> ldp:contains ?dataset .\n    }\n  `,n=await d(a,[t]),{dataset:r}=await u(n,["dataset"]),s=r.filter((t=>t.endsWith("props.ttl"))),i=[];for(const a of s){const n=await b(a,e),r="\n    SELECT ?uri WHERE {\n      ?meta a dcat:Dataset ;\n      dcat:distribution ?dist .\n      ?dist dcat:downloadURL ?uri .\n    }",s=await d(r,[a]),{uri:o}=await u(s,["uri"]);i.push({artefactRegistry:t+"artefactRegistry.ttl",accessRights:n,metadata:a,main:o[0]})}return i}async function b(t,e){return(await e.fetch(t,{method:"HEAD"})).headers.get("WAC-Allow").split(",")[0].replace("user=","").replaceAll('"',"").split(" ")}async function j(t,e){const a=`select ?index where {<${t}> lbd:hasProjectRegistry ?index}`,n=await d(a,[t]);let{index:r}=await u(n,["index"]);return r[0].endsWith("/")||(r+="/"),r[0]}async function m(t,e,a){try{var n={method:"PATCH",headers:{"Content-Type":"application/sparql-update"},body:t,redirect:"follow"};let r;return void(r=await a.fetch(e,n))}catch(t){throw console.log("error",t),t}}async function W(t,e,a){const n=`\n  SELECT ?alias WHERE {\n  <${t}> owl:sameAs ?alias .\n  }\n  `,r=await d(n,e),{alias:s}=await u(r,["alias"]);return s}async function R(t,e,a){}a(81092).newEngine}}]);