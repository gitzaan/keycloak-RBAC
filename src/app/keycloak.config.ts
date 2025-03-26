import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080',  
  realm: 'siemens-login',
  clientId: 'my-app'
};

export const environment = {
  production: false,
  keycloak: keycloakConfig
};