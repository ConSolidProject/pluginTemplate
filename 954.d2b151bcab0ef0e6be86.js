(self.webpackChunktemplate=self.webpackChunktemplate||[]).push([[954],{28599:e=>{"use strict";const{AbortController:r,AbortSignal:t}="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0;e.exports=r,e.exports.AbortSignal=t,e.exports.default=r},68954:function(e,r,t){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,r,t,n){void 0===n&&(n=t),Object.defineProperty(e,n,{enumerable:!0,get:function(){return r[t]}})}:function(e,r,t,n){void 0===n&&(n=t),e[n]=r[t]}),a=this&&this.__exportStar||function(e,r){for(var t in e)"default"===t||Object.prototype.hasOwnProperty.call(r,t)||n(r,e,t)};Object.defineProperty(r,"__esModule",{value:!0}),a(t(56327),r)},56327:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.SparqlEndpointFetcher=void 0,t(31905);const n=t(28599),a=t(9619),s=t(71846),o=t(5271),i=t(83858),c=t(99170),l=t(24970),u=t(19577).toNodeReadable;class d{constructor(e){e=e||{},this.method=e.method||"POST",this.fetchCb=e.fetch,this.sparqlJsonParser=new s.SparqlJsonParser(e),this.sparqlXmlParser=new o.SparqlXmlParser(e),this.sparqlParsers={[d.CONTENTTYPE_SPARQL_JSON]:{parseBooleanStream:e=>this.sparqlJsonParser.parseJsonBooleanStream(e),parseResultsStream:e=>this.sparqlJsonParser.parseJsonResultsStream(e)},[d.CONTENTTYPE_SPARQL_XML]:{parseBooleanStream:e=>this.sparqlXmlParser.parseXmlBooleanStream(e),parseResultsStream:e=>this.sparqlXmlParser.parseXmlResultsStream(e)}}}getQueryType(e){const r=(new a.Parser).parse(e);return"query"===r.type?"DESCRIBE"===r.queryType?"CONSTRUCT":r.queryType:"UNKNOWN"}getUpdateTypes(e){const r=(new a.Parser).parse(e);if("update"===r.type){const e={};for(const t of r.updates)"type"in t?e[t.type]=!0:e[t.updateType]=!0;return e}return"UNKNOWN"}async fetchBindings(e,r){const[t,n]=await this.fetchRawStream(e,r,d.CONTENTTYPE_SPARQL),a=this.sparqlParsers[t];if(!a)throw new Error("Unknown SPARQL results content type: "+t);return a.parseResultsStream(n)}async fetchAsk(e,r){const[t,n]=await this.fetchRawStream(e,r,d.CONTENTTYPE_SPARQL),a=this.sparqlParsers[t];if(!a)throw new Error("Unknown SPARQL results content type: "+t);return a.parseBooleanStream(n)}async fetchTriples(e,r){return(await this.fetchRawStream(e,r,d.CONTENTTYPE_TURTLE))[1].pipe(new c.StreamParser({format:d.CONTENTTYPE_TURTLE}))}async fetchUpdate(e,r){const t=new n.AbortController,a={method:"POST",headers:{"content-type":"application/sparql-update"},body:r,signal:t.signal};await this.handleFetchCall(e,a,{ignoreBody:!0}),t.abort()}async fetchRawStream(e,r,t){const n="POST"===this.method?e:e+"?query="+encodeURIComponent(r),a=new Headers;let s;return a.append("Accept",t),"POST"===this.method&&(a.append("Content-Type","application/x-www-form-urlencoded"),s=new URLSearchParams,s.set("query",r),a.append("Content-Length",s.toString().length.toString())),this.handleFetchCall(n,{headers:a,method:this.method,body:s})}async handleFetchCall(e,r,t={}){const n=await(this.fetchCb||fetch)(e,r);let a;t.ignoreBody||(a=l(n.body)?n.body:u(n.body));let s=n.headers.get("Content-Type")||"";if(s.indexOf(";")>0&&(s=s.substr(0,s.indexOf(";"))),!n.ok){const r=/^[^?]*/u.exec(e)[0];let t="empty response";throw a&&(t=await i(a)),new Error(`Invalid SPARQL endpoint response from ${r} (HTTP status ${n.status}):\n${t}`)}return[s,a]}}r.SparqlEndpointFetcher=d,d.CONTENTTYPE_SPARQL_JSON="application/sparql-results+json",d.CONTENTTYPE_SPARQL_XML="application/sparql-results+xml",d.CONTENTTYPE_SPARQL=`${d.CONTENTTYPE_SPARQL_JSON};q=1.0,${d.CONTENTTYPE_SPARQL_XML};q=0.7`,d.CONTENTTYPE_TURTLE="text/turtle"},71846:function(e,r,t){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,r,t,n){void 0===n&&(n=t),Object.defineProperty(e,n,{enumerable:!0,get:function(){return r[t]}})}:function(e,r,t,n){void 0===n&&(n=t),e[n]=r[t]}),a=this&&this.__exportStar||function(e,r){for(var t in e)"default"===t||Object.prototype.hasOwnProperty.call(r,t)||n(r,e,t)};Object.defineProperty(r,"__esModule",{value:!0}),a(t(42046),r),a(t(16714),r)},16714:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.SparqlJsonBindingsTransformer=void 0;const n=t(42830);class a extends n.Transform{constructor(e){super({objectMode:!0}),this.parser=e}_transform(e,r,t){t(null,this.parser.parseJsonBindings(e))}}r.SparqlJsonBindingsTransformer=a},42046:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.SparqlJsonParser=void 0;const n=t(41640),a=t(16714);r.SparqlJsonParser=class{constructor(e){e=e||{},this.dataFactory=e.dataFactory||new n.DataFactory,this.prefixVariableQuestionMark=!!e.prefixVariableQuestionMark}parseJsonResults(e){return e.results.bindings.map((e=>this.parseJsonBindings(e)))}parseJsonResultsStream(e){const r=e=>s.emit("error",e);e.on("error",r);const n=[];e.pipe(t(31327).parse("head.vars.*").on("error",r)).on("data",(e=>n.push(this.dataFactory.variable(e)))).on("end",(()=>s.emit("variables",n)));const s=e.pipe(t(31327).parse("results.bindings.*").on("error",r)).pipe(new a.SparqlJsonBindingsTransformer(this));return s}parseJsonBindings(e){const r={};for(const t in e){const n=e[t];let a=null;switch(n.type){case"bnode":a=this.dataFactory.blankNode(n.value);break;case"literal":a=n["xml:lang"]?this.dataFactory.literal(n.value,n["xml:lang"]):n.datatype?this.dataFactory.literal(n.value,this.dataFactory.namedNode(n.datatype)):this.dataFactory.literal(n.value);break;case"typed-literal":a=this.dataFactory.literal(n.value,this.dataFactory.namedNode(n.datatype));break;default:a=this.dataFactory.namedNode(n.value)}r[this.prefixVariableQuestionMark?"?"+t:t]=a}return r}parseJsonBoolean(e){if("boolean"in e)return e.boolean;throw new Error("No valid ASK response was found.")}parseJsonBooleanStream(e){return new Promise(((r,n)=>{e.on("error",n),e.pipe(t(31327).parse("boolean")).on("data",r).on("end",(()=>n(new Error("No valid ASK response was found."))))}))}}},47574:(e,r,t)=>{e.exports=t(47907)},20204:(e,r)=>{function t(e,r){var n;if(e&&(Array.isArray(e)&&(e=e[0]),Array.isArray(r)||(r=r.split("/")),n=r.shift(),e.children))return e=e.children[n],r.length?t(e,r):e}r.child=t,r.value=function(e,r){return(e=t(e,r))&&e.value},r.attr=function(e,r,n){return(e=t(e,r))&&e.attribs&&e.attribs[n]},r.addChild=function(e,r){var t={parent:e};return e.children=e.children||{},e.children[r]?(Array.isArray(e.children[r])||(e.children[r]=[e.children[r]]),e.children[r].push(t)):e.children[r]=t,t},r.addText=function(e,r){return e.value=r,e},r.concatText=function(e,r){return e.value=(e.value||"")+r,e}},47907:(e,r,t)=>{var n=t(42830).Transform,a=t(48600),s=t(36099),o=t(20204),i=t(59586)("sax-stream");function c(e){if(!(this instanceof c))return new c(e);n.call(this,{highWaterMark:e.highWaterMark||350,objectMode:!0}),this.records=[],this.error=null,this.parser=this.createSaxParser(e)}e.exports=c,a.inherits(c,n),c.prototype.createSaxParser=function(e){var r,t=this,n=s.parser(e.strict||!1,function(e){return["trim","normalize","lowercase","xmlns","position","strictEntities","noscript"].reduce((function(r,t){return t in e&&(r[t]=e[t]),r}),{position:!1})}(e)),a=function(r){return r===e.tag},c=function(e,r){t.records.push(r)};return Array.isArray(e.tag)&&(a=function(r){return-1!==e.tag.indexOf(r)},c=function(e,r){t.records.push({tag:e,record:r})}),n.onopentag=function(e){i('Open "%s"',e.name),r?r=o.addChild(r,e.name):a(e.name)&&(r={}),r&&Object.keys(e.attributes).length&&(r.attribs=e.attributes)},n.onclosetag=function(e){i('Closed "%s"',e),a(e)&&!r.parent?(i("Emitting record",r),c(e,r),r=void 0):r&&(r=r.parent)},n.ontext=function(e){r&&o.addText(r,e)},n.oncdata=function(e){r&&o.concatText(r,e)},n.onerror=function(e){t.error=e},n.onend=function(){i("onend - flushing remaining items"),t.pushAll(t.callback),t.callback=null},n},c.prototype.pushAll=function(e){if(this.error)return e(this.error),void(this.error=null);i("pushing %d",this.records.length),this.records.forEach(this.push.bind(this)),this.records.length=0,e()},c.prototype._transform=function(e,r,t){this.parser.write(e.toString()),this.pushAll(t)},c.prototype._flush=function(e){this.callback=e,this.parser.close()}},59586:(e,r,t)=>{var n=t(34155);function a(){var e;try{e=r.storage.debug}catch(e){}return!e&&void 0!==n&&"env"in n&&(e=n.env.DEBUG),e}(r=e.exports=t(3655)).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},r.formatArgs=function(e){var t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+r.humanize(this.diff),t){var n="color: "+this.color;e.splice(1,0,n,"color: inherit");var a=0,s=0;e[0].replace(/%[a-zA-Z%]/g,(function(e){"%%"!==e&&(a++,"%c"===e&&(s=a))})),e.splice(s,0,n)}},r.save=function(e){try{null==e?r.storage.removeItem("debug"):r.storage.debug=e}catch(e){}},r.load=a,r.useColors=function(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type)||("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},r.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),r.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],r.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},r.enable(a())},3655:(e,r,t)=>{var n;function a(e){function t(){if(t.enabled){var e=t,a=+new Date,s=a-(n||a);e.diff=s,e.prev=n,e.curr=a,n=a;for(var o=new Array(arguments.length),i=0;i<o.length;i++)o[i]=arguments[i];o[0]=r.coerce(o[0]),"string"!=typeof o[0]&&o.unshift("%O");var c=0;o[0]=o[0].replace(/%([a-zA-Z%])/g,(function(t,n){if("%%"===t)return t;c++;var a=r.formatters[n];if("function"==typeof a){var s=o[c];t=a.call(e,s),o.splice(c,1),c--}return t})),r.formatArgs.call(e,o);var l=t.log||r.log||console.log.bind(console);l.apply(e,o)}}return t.namespace=e,t.enabled=r.enabled(e),t.useColors=r.useColors(),t.color=function(e){var t,n=0;for(t in e)n=(n<<5)-n+e.charCodeAt(t),n|=0;return r.colors[Math.abs(n)%r.colors.length]}(e),"function"==typeof r.init&&r.init(t),t}(r=e.exports=a.debug=a.default=a).coerce=function(e){return e instanceof Error?e.stack||e.message:e},r.disable=function(){r.enable("")},r.enable=function(e){r.save(e),r.names=[],r.skips=[];for(var t=("string"==typeof e?e:"").split(/[\s,]+/),n=t.length,a=0;a<n;a++)t[a]&&("-"===(e=t[a].replace(/\*/g,".*?"))[0]?r.skips.push(new RegExp("^"+e.substr(1)+"$")):r.names.push(new RegExp("^"+e+"$")))},r.enabled=function(e){var t,n;for(t=0,n=r.skips.length;t<n;t++)if(r.skips[t].test(e))return!1;for(t=0,n=r.names.length;t<n;t++)if(r.names[t].test(e))return!0;return!1},r.humanize=t(13900),r.names=[],r.skips=[],r.formatters={}},13900:e=>{var r=1e3,t=60*r,n=60*t,a=24*n;function s(e,r,t){if(!(e<r))return e<1.5*r?Math.floor(e/r)+" "+t:Math.ceil(e/r)+" "+t+"s"}e.exports=function(e,o){o=o||{};var i,c=typeof e;if("string"===c&&e.length>0)return function(e){if(!((e=String(e)).length>100)){var s=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(s){var o=parseFloat(s[1]);switch((s[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*o;case"days":case"day":case"d":return o*a;case"hours":case"hour":case"hrs":case"hr":case"h":return o*n;case"minutes":case"minute":case"mins":case"min":case"m":return o*t;case"seconds":case"second":case"secs":case"sec":case"s":return o*r;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return o;default:return}}}}(e);if("number"===c&&!1===isNaN(e))return o.long?s(i=e,a,"day")||s(i,n,"hour")||s(i,t,"minute")||s(i,r,"second")||i+" ms":function(e){return e>=a?Math.round(e/a)+"d":e>=n?Math.round(e/n)+"h":e>=t?Math.round(e/t)+"m":e>=r?Math.round(e/r)+"s":e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},5271:function(e,r,t){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,r,t,n){void 0===n&&(n=t),Object.defineProperty(e,n,{enumerable:!0,get:function(){return r[t]}})}:function(e,r,t,n){void 0===n&&(n=t),e[n]=r[t]}),a=this&&this.__exportStar||function(e,r){for(var t in e)"default"===t||Object.prototype.hasOwnProperty.call(r,t)||n(r,e,t)};Object.defineProperty(r,"__esModule",{value:!0}),a(t(3189),r),a(t(82818),r)},82818:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.SparqlXmlBindingsTransformer=void 0;const n=t(42830);class a extends n.Transform{constructor(e){super({objectMode:!0}),this.parser=e}_transform(e,r,t){let n;try{n=this.parser.parseXmlBindings(e)}catch(e){return t(e)}t(null,n)}}r.SparqlXmlBindingsTransformer=a},3189:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.SparqlXmlParser=void 0;const n=t(41640),a=t(82818),s=t(47574);r.SparqlXmlParser=class{constructor(e){e=e||{},this.dataFactory=e.dataFactory||new n.DataFactory,this.prefixVariableQuestionMark=!!e.prefixVariableQuestionMark}parseXmlResultsStream(e){const r=[];e.pipe(s({strict:!0,tag:"variable"})).on("data",(e=>r.push(this.dataFactory.variable(e.attribs.name)))).on("error",(()=>{})).on("finish",(()=>t.emit("variables",r)));const t=e.pipe(s({strict:!0,tag:"result"})).on("error",(e=>t.emit("error",e))).pipe(new a.SparqlXmlBindingsTransformer(this));return e.on("error",(e=>t.emit("error",e))),t}parseXmlBindings(e){const r={};if(e.children){const t=Array.isArray(e.children.binding)?e.children.binding:[e.children.binding];for(const e of t)if(e.attribs&&e.children){const t=e.attribs.name;let n=null;if(e.children.bnode)n=this.dataFactory.blankNode(e.children.bnode.value);else if(e.children.literal){const r=e.children.literal.value||"",t=e.children.literal.attribs;n=t&&t["xml:lang"]?this.dataFactory.literal(r,t["xml:lang"]):t&&t.datatype?this.dataFactory.literal(r,this.dataFactory.namedNode(t.datatype)):this.dataFactory.literal(r)}else n=this.dataFactory.namedNode(e.children.uri.value);r[this.prefixVariableQuestionMark?"?"+t:t]=n}}return r}parseXmlBooleanStream(e){return new Promise(((r,t)=>{e.on("error",t),e.pipe(s({strict:!0,tag:"boolean"})).on("error",t).on("data",(e=>r("true"===e.value))).on("end",(()=>t(new Error("No valid ASK response was found."))))}))}}}}]);