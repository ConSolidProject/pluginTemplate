const documentMeta = (name, title, keyword) => {
    const name = file.name
    let extension = name.split(".")[name.split(".").length -1]

    let data =  `@prefix acl: <http://www.w3.org/ns/auth/acl#>. 
    @prefix lbd: <https://lbdserver.org/vocabulary#>. 
    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. 
    @prefix vcard: <http://www.w3.org/2006/vcard/ns#>.

    @prefix : <./>. 
    <${documentUrl}> rdfs:comment "${description}";
        rdfs:label "${name}".
    `

    data = data.replace(/\n/g, "")
    return data
}

const projectRegistryMeta = (uri, id, description, label) => {
    let data =  `@prefix acl: <http://www.w3.org/ns/auth/acl#>. 
    @prefix lbd: <https://lbdserver.org/vocabulary#>. 
    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. 
    @prefix vcard: <http://www.w3.org/2006/vcard/ns#>.
    @prefic dct: <http://purl.org/dc/terms/>.
    @prefix : <./>. 
    
    <${uri}> 
        dct:identifier "${id}" ;
        rdfs:comment "${description}" ;
        rdfs:label "${label}" ;
        lbd:stakeholderRegistry <${uri}/stakeholders> ;
        lbd:hasRDFContainer <${uri}/graphs/> ;
        lbd:hasNonRDFContainer <${uri}/files/> .
    `

    data = data.replace(/\n/g, "")
    return data
}

const inviteTemplate = (projectUri, sender) => {
    // let data =  `@prefix acl: <http://www.w3.org/ns/auth/acl#>. 
    // @prefix lbd: <https://lbdserver.org/vocabulary#>. 
    // @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. 
    // @prefix vcard: <http://www.w3.org/2006/vcard/ns#>.
    // @prefic dct: <http://purl.org/dc/terms/>.
    // @prefix : <./>. 
    
    // <${uri}> 
    //     dct:identifier "${id}" ;
    //     rdfs:comment "${description}" ;
    //     rdfs:label "${label}" ;
    //     lbd:stakeholderRegistry <${uri}/stakeholders> ;
    //     lbd:hasRDFContainer <${uri}/graphs/> ;
    //     lbd:hasNonRDFContainer <${uri}/files/> .
    // `

    // data = data.replace(/\n/g, "")
    // return data
}

export {
 namedGraphMeta,
 documentMeta,
 projectRegistryMeta,
 inviteTemplate
}