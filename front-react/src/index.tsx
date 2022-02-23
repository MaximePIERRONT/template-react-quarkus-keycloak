import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import KeycloakOptions from "./interface/keycloakOptions";
import Keycloak from "keycloak-js";

const initOptions:KeycloakOptions = {
    url: 'http://127.0.0.1:8081/auth',
    realm: 'demo',
    clientId: 'react-test-app',
    onLoad: 'login-required',
    promiseType: 'native'
}

const keycloak: Keycloak.KeycloakInstance = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
    }

    //React Render
    ReactDOM.render(<App />, document.getElementById('root'));

    localStorage.setItem("react-token", keycloak.token as string);
    localStorage.setItem("react-refresh-token", keycloak.refreshToken as string);

    setTimeout(() => {
        keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                const exp: number | undefined = keycloak.tokenParsed?.exp;
                const timeSkew: number | undefined = keycloak.timeSkew;
                if (exp !== undefined && timeSkew !== undefined) {
                    console.warn('Token not refreshed, valid for '
                        + Math.round(exp + timeSkew - new Date().getTime() / 1000) + ' seconds');
                }
            }
        }).catch(() => {
            console.error('Failed to refresh token');
        });
    }, 60000)

}).catch(() => {
    console.error("Authenticated Failed");
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();