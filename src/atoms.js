import {atom, atomFamily, selectorFamily} from 'recoil'
import {Session} from "@inrupt/solid-client-authn-browser"

const projects = atom({
    key: "projects",
    default: ["http://localhost:5000/jeroen/lbd/642f0417-ce23-4d9d-8806-c078aed93ae1/"]
})

const activeResources = atom({
    key: "activeResources",
    default: []
})

const selectedElements = atom({
    key: "selectedElements",
    default: []
})

const selectionId = atom({
    key: "selectionId",
    default: ""
})

const trigger = atom({
    key: "trigger",
    default: '0'
})

export {projects, activeResources, selectedElements, selectionId, trigger}