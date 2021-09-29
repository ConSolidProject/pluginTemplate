"use strict";(self.webpackChunkresourcemanager=self.webpackChunkresourcemanager||[]).push([[735],{9735:(e,t,n)=>{n.r(t),n.d(t,{default:()=>B});var r=n(7271),a=n.n(r),o=n(97650),l=n.n(o),i=n(15861),c=n(29439),s=n(87757),u=n.n(s),d=n(5034),m=n(26975),p=n(97591),g=n(75073),f=(n(77389),n(81092).newEngine,n(4147)),h=(0,d.Z)({productionPrefix:f.name,seed:f.name});const v=function(e){var t=e.sharedProps,n=e.inactive,o=(t.projects,t.activeResources,t.trigger),l=(t.setTrigger,(0,r.useState)((0,g.getDefaultSession)())),i=(0,c.Z)(l,2),s=(i[0],i[1]);return(0,r.useEffect)((function(){s((function(){return(0,g.getDefaultSession)()}))}),[o]),n?a().createElement(a().Fragment,null):a().createElement(m.ZP,{generateClassName:h},a().createElement("div",{style:{margin:20,textAlign:"justify"}},a().createElement(p.Typography,{variant:"h5"},"Plugin Template"),a().createElement(p.Typography,{variant:"body1"},"This is a template for your LBDserver/ConSolid plugin. It is a federated LBDserver module, which means it can be used standalone as well as in a configuration alongside other plugins. Enjoy coding!"),a().createElement("br",null),a().createElement(p.Typography,{variant:"body1"},"This module is exposed at:"),a().createElement("a",{target:"_blank",href:"https://consolidproject.github.io/pluginTemplate/"},"https://consolidproject.github.io/pluginTemplate/")))};var b=n(24853),y=(0,b.atom)({key:"projects",default:["http://localhost:5000/jeroen/lbd/642f0417-ce23-4d9d-8806-c078aed93ae1/"]}),E=(0,b.atom)({key:"activeResources",default:[]}),w=(0,b.atom)({key:"selectedElements",default:[]}),k=(0,b.atom)({key:"selectionId",default:""}),S=(0,b.atom)({key:"trigger",default:"0"}),x=n(64566),Z=n(89875);function D(){return T.apply(this,arguments)}function T(){return(T=(0,i.Z)(u().mark((function e(){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,(0,g.getDefaultSession)().info.isLoggedIn){e.next=13;break}if(!new URLSearchParams(window.location.search).get("code")){e.next=10;break}return console.log("checking code param"),e.next=8,(0,g.handleIncomingRedirect)();case 8:e.next=13;break;case 10:return console.log("checking previous session data"),e.next=13,(0,g.handleIncomingRedirect)({restorePreviousSession:!0});case 13:return e.abrupt("return",(0,g.getDefaultSession)());case 16:e.prev=16,e.t0=e.catch(0),console.log("error",e.t0);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})))).apply(this,arguments)}function C(){var e=(0,r.useState)("http://localhost:5000"),t=(0,c.Z)(e,2),n=t[0],o=t[1],l=(0,r.useState)(!1),s=(0,c.Z)(l,2),d=s[0],m=s[1],f=(0,b.useRecoilState)(S),h=(0,c.Z)(f,2),v=(h[0],h[1]);(0,r.useEffect)((function(){D().then((function(e){return v((function(e){return e+1}))})),console.log("getDefaultSession()",(0,g.getDefaultSession)())}),[]);var y=function(){var e=(0,i.Z)(u().mark((function e(t){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,m(!0),(0,g.getDefaultSession)().info.isLoggedIn){e.next=5;break}return e.next=5,(0,g.login)({oidcIssuer:n,redirectUrl:window.location.href,clientName:"lbdserver"});case 5:m(!1),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("error",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}(),E=function(){var e=(0,i.Z)(u().mark((function e(t){var n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,m(!0),n=(0,g.getDefaultSession)(),e.next=5,n.logout();case 5:return e.next=7,D();case 7:e.sent,v((function(e){return e+1})),m(!1),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),console.log("error",e.t0),m(!1);case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}();return a().createElement(a().Fragment,null,d?a().createElement(p.CircularProgress,{style:{marginTop:200,position:"absolute",left:"50%"},size:"80px",color:"secondary"}):a().createElement(p.Container,{component:"main"},(0,g.getDefaultSession)().info.isLoggedIn?a().createElement("div",null,a().createElement("p",null,"Welcome! Your are logged in as:"),a().createElement("a",{style:{fontSize:12},href:(0,g.getDefaultSession)().info.webId},(0,g.getDefaultSession)().info.webId),a().createElement(p.Button,{fullWidth:!0,variant:"contained",color:"primary",onClick:E,style:{marginTop:20}},"Sign out")):a().createElement("div",null,a().createElement("form",{onSubmit:function(e){return e.preventDefault()},noValidate:!0},a().createElement(p.TextField,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,value:n,onChange:function(e){return o(e.target.value)},id:"idp",label:"Identity Provider",name:"idp",autoFocus:!0}),a().createElement(p.Button,{fullWidth:!0,variant:"contained",color:"primary",onClick:y},"Sign in")))))}n(334);var I=(0,p.makeStyles)({paper:{width:450,backgroundColor:"lightGray"}});function R(){var e=I(),t=(0,r.useState)(!0),n=(0,c.Z)(t,2),o=n[0],l=n[1],i=(0,r.useState)(!0),s=(0,c.Z)(i,2),u=s[0],d=s[1];return a().createElement("div",null,a().createElement(p.IconButton,{style:{position:"absolute",right:o?450:0},variant:"contained",color:"primary",onClick:function(){return l(!o)}},o?a().createElement(a().Fragment,null):a().createElement(Z.Z,null)),a().createElement(a().Fragment,null,a().createElement(p.Drawer,{backgroundColor:"gray",anchor:"right",open:o,onClose:function(){return l(!o)},classes:{paper:e.paper}},a().createElement("div",{style:{margin:20}},a().createElement(p.Typography,{variant:"h6"},"Welcome to the LBDserver plugin demo"),a().createElement("hr",null),a().createElement(p.Typography,{variant:"body1"},"This drawer allows you to authenticate to a Solid IDP, to choose a consolid project and develop your plugin independent from a main container application."),a().createElement("br",null),a().createElement("br",null),a().createElement(p.Typography,{variant:"body1"},"Visit ",a().createElement("a",{target:"_blank",href:"https://lbdserver.org"},"https://lbdserver.org")," for more information.")),a().createElement("div",null,a().createElement(p.Accordion,{style:{margin:10},expanded:u,onChange:function(){return d(!u)}},a().createElement(p.AccordionSummary,{expandIcon:a().createElement(x.Z,null),"aria-controls":"panel1a-content",id:"panel1a-header"},a().createElement(p.Typography,null,"Authentication")),a().createElement(p.AccordionDetails,null,a().createElement(C,null)))))))}var j=n(12780),P=n(4147),L=function(e){var t=(0,r.useState)("http://localhost:5000"),n=(0,c.Z)(t,2),o=(n[0],n[1],(0,r.useState)("https://localhost:8081")),l=(0,c.Z)(o,2),i=(l[0],l[1]);(0,r.useEffect)((function(){i(window.location.href)}),[i]);var s,u,d=(s=v,u=e.module,function(){var e=(0,b.useRecoilState)(E),t=(0,c.Z)(e,2),n=t[0],r=t[1],o=(0,b.useRecoilState)(w),l=(0,c.Z)(o,2),i=l[0],d=l[1],m=(0,b.useRecoilState)(y),p=(0,c.Z)(m,2),g=p[0],f=p[1],h=(0,b.useRecoilState)(k),v=(0,c.Z)(h,2),x=v[0],Z=v[1],D=(0,b.useRecoilState)(S),T=(0,c.Z)(D,2),C={projects:g,setProjects:f,activeResources:n,setActiveResources:r,selectedElements:i,setSelectedElements:d,selectionId:x,setSelectionId:Z,trigger:T[0],setTrigger:T[1]};return a().createElement(s,{sharedProps:C,module:u,children:null,inactive:!1})});return a().createElement("div",null,a().createElement(R,null),a().createElement(d,null))};n(4147);var q=function(e,t,n){var r;if(n)r=a().createElement(n,null);else{var o={};t&&(o=t),r=a().createElement(v,o)}l().render(r,e)},A=document.querySelector("#_plugindemo");A&&q(A,{},(function(){var e={url:"http://example.org/remoteEntry.js",scope:P.name,label:P.name,module:"./index",dimensions:{x:0,y:0,h:850,w:400}};return a().createElement("div",{style:{width:e.dimensions.w,height:e.dimensions.h}},a().createElement(b.RecoilRoot,null,a().createElement(j.QueryClientProvider,{client:new j.QueryClient},a().createElement(L,{module:e}))))}));const B=q},4147:e=>{e.exports=JSON.parse('{"name":"resourcemanager","version":"1.0.0","port":8081,"scripts":{"start":"webpack serve --config config/webpack.dev.js","build":"webpack --config config/webpack.prod.js"},"dependencies":{"@comunica/actor-init-sparql":"^1.22.0","@inrupt/solid-client-authn-browser":"^1.11.2","@material-ui/core":"^4.11.0","@material-ui/icons":"^4.9.1","assert":"^2.0.0","browserify-zlib":"^0.2.0","buffer":"^6.0.3","consolid":"^1.0.1","crypto-browserify":"^3.12.0","events":"^3.3.0","fetch-sparql-endpoint":"^2.3.1","graphql-ld-comunica-solid":"^1.0.1","jszip":"^3.7.1","mime-types":"^2.1.32","n3":"^1.11.1","os-browserify":"^0.3.0","path-browserify":"^1.0.1","process":"^0.11.10","react":"^17.0.1","react-dom":"^17.0.1","react-query":"^3.24.3","react-router-dom":"^5.2.0","recoil":"^0.4.1","stream-browserify":"^3.0.0","util":"^0.12.4"},"devDependencies":{"@babel/core":"^7.12.3","@babel/plugin-transform-runtime":"^7.12.1","@babel/preset-env":"^7.12.1","@babel/preset-react":"^7.12.1","babel-loader":"^8.1.0","clean-webpack-plugin":"^3.0.0","css-loader":"^5.0.0","html-webpack-plugin":"^4.5.0","source-map-loader":"^3.0.0","style-loader":"^2.0.0","webpack":"^5.4.0","webpack-cli":"^4.1.0","webpack-dev-server":"^3.11.0","webpack-merge":"^5.2.0"}}')}}]);