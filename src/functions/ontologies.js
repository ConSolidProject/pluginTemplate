const container = `
@prefix : <http://www.iso-icdd.org/examples/part1/usecase1A/requirements/index.rdf#> .
@prefix ct: <http://www.iso-icdd.org/part1/2019/Container#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<http://www.iso-icdd.org/examples/part1/usecase1A/requirements/index.rdf> a ct:ContainerDescription,
        owl:Ontology ;
    ct:conformanceIndicator "ICDD-Part1-Container" ;
    ct:containsDocument :id39a2f462-8685-4258-8e33-8e1441bc1c3f,
        :id57460da1-87ec-4d74-b8d4-cf0f5f16bf9f,
        :id5889c5d9-8b9e-4ecb-9ec2-9db56e4ecbf1,
        :id9a34f397-aa5a-4f25-9109-4b4839ff1505,
        :id9f01cef7-8939-4ee4-ac88-27d49df430c3,
        :idb57cbae5-5e10-448d-855b-f09b4b146814,
        :idc59e723b-95a8-4e84-9154-54db44a240a1 ;
    ct:creationDate "2018-05-28T14:13:28.167000"^^xsd:dateTime ;
    ct:creator :id0b80ea4e-eba1-481f-bc97-309c0de355b9 ;
    ct:description "icdd showcase 1a:  Requirements container" ;
    ct:publisher :idd849fa6d-8491-4af1-904f-99a760571c87 ;
    ct:versionDescription "first version" ;
    ct:versionID "1" ;
    owl:imports <http://www.iso-icdd.org/part1/2019/Container> .

:id39a2f462-8685-4258-8e33-8e1441bc1c3f a ct:InternalDocument ;
    ct:creationDate "2018-05-28T14:13:28.167000"^^xsd:dateTime ;
    ct:creator :id0b80ea4e-eba1-481f-bc97-309c0de355b9 ;
    ct:description "Excel template for the timesheet" ;
    ct:filename "TimeSheetTemplate.xlsx" ;
    ct:filetype "xlsx" ;
    ct:format "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ;
    ct:name "TimeSheetTemplate.xlsx" ;
    ct:pending false ;
    ct:versionDescription "first version" ;
    ct:versionID "1" .

:id57460da1-87ec-4d74-b8d4-cf0f5f16bf9f a ct:InternalDocument ;
    ct:creationDate "2018-05-28T14:13:28.167000"^^xsd:dateTime ;
    ct:creator :id0b80ea4e-eba1-481f-bc97-309c0de355b9 ;
    ct:description "Excel inspection report. One row in Excel must be for each construction part" ;
    ct:filename "inspection_48D-100.xls" ;
    ct:filetype "xls" ;
    ct:name "inspection_48D-100.xls" ;
    ct:pending true ;
    ct:versionDescription "first version" ;
    ct:versionID "1" .

:id5889c5d9-8b9e-4ecb-9ec2-9db56e4ecbf1 a ct:InternalDocument ;
    ct:creationDate "2018-05-28T14:13:28.167000"^^xsd:dateTime ;
    ct:creator :id0b80ea4e-eba1-481f-bc97-309c0de355b9 ;
    ct:description "IDS including decomposition requirements for the IFC file" ;
    ct:filename "IDSV1.pdf" ;
    ct:filetype "pdf" ;
    ct:format "application/pdf" ;
    ct:name "IDSV1.pdf" ;
    ct:pending false ;
    ct:versionDescription "first version" ;
    ct:versionID "1" .

:id9a34f397-aa5a-4f25-9109-4b4839ff1505 a ct:InternalDocument ;
    ct:creationDate "2018-05-28T14:13:28.167000"^^xsd:dateTime ;
    ct:creator :id0b80ea4e-eba1-481f-bc97-309c0de355b9 ;
    ct:description "Excel template for the inspection report" ;
    ct:filename "InspectionReportTemplate.xlsx" ;
    ct:filetype "xlsx" ;
    ct:format "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ;
    ct:name "InspectionReportTemplate.xlsx" ;
    ct:pending false ;
    ct:versionDescription "first version" ;
    ct:versionID "1" .

:id9f01cef7-8939-4ee4-ac88-27d49df430c3 a ct:InternalDocument ;
    ct:creationDate "2018-05-28T14:13:28.167000"^^xsd:dateTime ;
    ct:creator :id0b80ea4e-eba1-481f-bc97-309c0de355b9 ;
    ct:description "An IFC/BIM model of viaduct Asset 48D-100" ;
    ct:filename "48D-100.ifc" ;
    ct:filetype "ifc" ;
    ct:name "48D-100.IFC" ;
    ct:pending true ;
    ct:versionDescription "first version" ;
    ct:versionID "1" .

:idb57cbae5-5e10-448d-855b-f09b4b146814 a ct:InternalDocument ;
    ct:creationDate "2018-05-28T14:13:28.167000"^^xsd:dateTime ;
    ct:creator :id0b80ea4e-eba1-481f-bc97-309c0de355b9 ;
    ct:description "a photo is required for each issue" ;
    ct:filename "issuePhoto.png" ;
    ct:filetype "png" ;
    ct:name "IssuePhoto.png" ;
    ct:pending true ;
    ct:versionDescription "first version" ;
    ct:versionID "1" .

:idc59e723b-95a8-4e84-9154-54db44a240a1 a ct:InternalDocument ;
    ct:creationDate "2018-05-28T14:13:28.167000"^^xsd:dateTime ;
    ct:creator :id0b80ea4e-eba1-481f-bc97-309c0de355b9 ;
    ct:description "Time sheet" ;
    ct:filename "timesheet.xls" ;
    ct:filetype "xls" ;
    ct:name "timesheet.xls" ;
    ct:pending true ;
    ct:versionDescription "first version" ;
    ct:versionID "1" .

:idd849fa6d-8491-4af1-904f-99a760571c87 a ct:Organisation ;
    ct:creationDate "2018-05-28T14:13:28.167000"^^xsd:dateTime ;
    ct:creator :id0b80ea4e-eba1-481f-bc97-309c0de355b9 ;
    ct:description "a working group preparing Part 1 and Part 2 of the ICDD" ;
    ct:versionDescription "first version" ;
    ct:versionID "1" .

:id0b80ea4e-eba1-481f-bc97-309c0de355b9 a ct:Person ;
    ct:creationDate "2018-05-28T14:13:28.167000"^^xsd:dateTime ;
    ct:creator :id0b80ea4e-eba1-481f-bc97-309c0de355b9 ;
    ct:description "works at BuildingBits.nl" ;
    ct:name "Hans Schevers" ;
    ct:versionDescription "first version" ;
    ct:versionID "1" .
`

const linkSet = `
@prefix : <http://www.iso-icdd.org/draft/Linkset.rdf#> .
@prefix ct: <http://www.iso-icdd.org/draft/Container.rdf#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<http://www.iso-icdd.org/draft/Linkset.rdf> a owl:Ontology ;
    owl:imports <http://www.iso-icdd.org/draft/Container.rdf> ;
    owl:versionInfo "Created with TopBraid Composer" .

:Directed1toNLink a owl:Class ;
    rdfs:label "Directed1to NLink"@en-GB ;
    rdfs:comment "an ls:Directed1toNLink is a subtype of ls:DirectedLink mandating exactly 1 ls:hasFromLinkElement"@en-GB ;
    rdfs:subClassOf [ a owl:Restriction ;
            owl:cardinality "1"^^xsd:nonNegativeInteger ;
            owl:onProperty :hasFromLinkElement ],
        :DirectedLink .

:DirectedBinaryLink a owl:Class ;
    rdfs:label "Directed binary link"@en-GB ;
    rdfs:comment "a subtype of a binary link (that has exactly 2 LinkElements) that uses the subproperties hasFromLinkElement and hasToLinkElement to denote a direction of this link"@en-GB ;
    rdfs:subClassOf [ a owl:Restriction ;
            owl:cardinality "1"^^xsd:nonNegativeInteger ;
            owl:onProperty :hasToLinkElement ],
        [ a owl:Restriction ;
            owl:cardinality "1"^^xsd:nonNegativeInteger ;
            owl:onProperty :hasFromLinkElement ],
        :BinaryLink,
        :DirectedLink .

:querySortExpression a owl:DatatypeProperty,
        owl:FunctionalProperty ;
    rdfs:label "query sort expression"@en-GB ;
    rdfs:comment "the query sorting string"@en-GB ;
    rdfs:domain :QueryBasedIdentifier ;
    rdfs:range xsd:string .

:url a owl:DatatypeProperty ;
    rdfs:label "url"@en-GB ;
    rdfs:comment "an url for referring to a document via an URL"@en-GB ;
    rdfs:domain :URLBasedIdentifier ;
    rdfs:range xsd:anyURI .

:BinaryLink a owl:Class ;
    rdfs:label "Binary link"@en-GB ;
    rdfs:comment "An ls:Link comprising exactly 2 individuals of class ls:LinkElement"@en-GB ;
    rdfs:subClassOf [ a owl:Restriction ;
            owl:cardinality "2"^^xsd:nonNegativeInteger ;
            owl:onProperty :hasLinkElement ],
        :Link ;
    owl:equivalentClass [ a owl:Class ;
            owl:intersectionOf ( :Link [ a owl:Restriction ;
                        owl:cardinality "2"^^xsd:nonNegativeInteger ;
                        owl:onProperty :hasLinkElement ] ) ] .

:hasDocument a owl:ObjectProperty ;
    rdfs:label "has document"@en-GB ;
    rdfs:comment "a reference from a ls:LinkElement to a ls:Document"@en-GB ;
    rdfs:domain :LinkElement ;
    rdfs:range ct:Document .

:hasIdentifier a owl:ObjectProperty ;
    rdfs:label "has identifier"@en-GB ;
    rdfs:comment "a reference from ls:LinkElement to an ls:Identifier"@en-GB ;
    rdfs:domain :LinkElement ;
    rdfs:range :Identifier .

:identifier a owl:DatatypeProperty,
        owl:FunctionalProperty ;
    rdfs:label "identifier"@en-GB ;
    rdfs:comment "a string datatype property containing the identifier"@en-GB ;
    rdfs:domain :StringBasedIdentifier ;
    rdfs:range xsd:string .

:identifierField a owl:DatatypeProperty,
        owl:FunctionalProperty ;
    rdfs:label "identifier field"@en-GB ;
    rdfs:comment "a string datatype for defining the field where the identifier can be found (optionally)"@en-GB ;
    rdfs:domain :StringBasedIdentifier ;
    rdfs:range xsd:string .

:queryExpression a owl:DatatypeProperty,
        owl:FunctionalProperty ;
    rdfs:label "query expression"@en-GB ;
    rdfs:comment "the query resulting into a identifier"@en-GB ;
    rdfs:domain :QueryBasedIdentifier ;
    rdfs:range xsd:string .

:queryLanguage a owl:DatatypeProperty,
        owl:FunctionalProperty ;
    rdfs:label "query language"@en-GB ;
    rdfs:comment "a query lanugage specification"@en-GB ;
    rdfs:domain :QueryBasedIdentifier ;
    rdfs:range xsd:string .

:URLBasedIdentifier a owl:Class ;
    rdfs:label "URLBased identifier"@en-GB ;
    rdfs:comment "URL based identifier for referring to documents via an URL"@en-GB ;
    rdfs:subClassOf :Identifier .

:hasToLinkElement a owl:ObjectProperty ;
    rdfs:label "outgoing link element"@en-GB ;
    rdfs:comment "a reference from a ls:Link to a ls:LinkElement. It is a sub property of ls:hasLinkElement"@en-GB ;
    rdfs:domain :DirectedLink ;
    rdfs:range :LinkElement ;
    rdfs:subPropertyOf :hasLinkElement .

:StringBasedIdentifier a owl:Class ;
    rdfs:label "String based identifier"@en-GB ;
    rdfs:comment "identification of an entity within a document via a String ID"@en-GB ;
    rdfs:subClassOf [ a owl:Restriction ;
            owl:maxCardinality "1"^^xsd:nonNegativeInteger ;
            owl:onProperty :identifierField ],
        [ a owl:Restriction ;
            owl:cardinality "1"^^xsd:nonNegativeInteger ;
            owl:onProperty :identifier ],
        :Identifier .

:hasFromLinkElement a owl:ObjectProperty ;
    rdfs:label "incoming link element"@en-GB ;
    rdfs:comment "a reference from a ls:Link to a ls:LinkElement. It is a sub property of ls:hasLinkElement"@en-GB ;
    rdfs:domain :DirectedLink ;
    rdfs:range :LinkElement ;
    rdfs:subPropertyOf :hasLinkElement .

:DirectedLink a owl:Class ;
    rdfs:label "Directed link"@en-GB ;
    rdfs:comment "a  subtype of a binary link (that has exactly 2 instances of ls:LinkElement) that uses the subproperties ls:hasFromLinkElement and ls:hasToLinkElement to denote a direction of this link"@en-GB ;
    rdfs:subClassOf [ a owl:Restriction ;
            owl:minCardinality "1"^^xsd:nonNegativeInteger ;
            owl:onProperty :hasToLinkElement ],
        [ a owl:Restriction ;
            owl:minCardinality "1"^^xsd:nonNegativeInteger ;
            owl:onProperty :hasFromLinkElement ],
        :Link .

:Link a owl:Class ;
    rdfs:label "Link"@en-GB ;
    rdfs:comment "A grouping of 1 or more ls:Link elements"@en-GB ;
    rdfs:subClassOf [ a owl:Restriction ;
            owl:minCardinality "2"^^xsd:nonNegativeInteger ;
            owl:onProperty :hasLinkElement ] .

:QueryBasedIdentifier a owl:Class ;
    rdfs:label "Query based identifier"@en-GB ;
    rdfs:comment "a identifier of an entity in a document based upon a query"@en-GB ;
    rdfs:subClassOf [ a owl:Restriction ;
            owl:cardinality "1"^^xsd:nonNegativeInteger ;
            owl:onProperty :queryExpression ],
        [ a owl:Restriction ;
            owl:cardinality "1"^^xsd:nonNegativeInteger ;
            owl:onProperty :queryLanguage ],
        :Identifier .

:Identifier a owl:Class ;
    rdfs:label "Identifier"@en-GB ;
    rdfs:comment "an abstract class for identification of an entity within a document."@en-GB ;
    rdfs:subClassOf [ a owl:Class ;
            owl:unionOf ( :QueryBasedIdentifier :StringBasedIdentifier :URLBasedIdentifier ) ] .

:LinkElement a owl:Class ;
    rdfs:label "Link element"@en-GB ;
    rdfs:comment "A proxy class for referencing to a model or to an entity in a document"@en-GB ;
    rdfs:subClassOf [ a owl:Restriction ;
            owl:maxQualifiedCardinality "1"^^xsd:nonNegativeInteger ;
            owl:onClass :Identifier ;
            owl:onProperty :hasIdentifier ],
        [ a owl:Restriction ;
            owl:onClass ct:Document ;
            owl:onProperty :hasDocument ;
            owl:qualifiedCardinality "1"^^xsd:nonNegativeInteger ] .

:hasLinkElement a owl:ObjectProperty ;
    rdfs:label "has link element"@en-GB ;
    rdfs:comment "a reference from a ls:Link to a ls:LinkElement"@en-GB ;
    rdfs:domain :Link ;
    rdfs:range :LinkElement .
`

export {container, linkSet}