import {KeycloakOnLoad} from "keycloak-js";

interface KeycloakOptions {
    url:string,
    realm:string,
    clientId:string,
    onLoad:KeycloakOnLoad,
    promiseType:string
}

export default KeycloakOptions;