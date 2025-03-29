import { ApplicationConfig, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideKeycloak } from 'keycloak-angular';
import { environment } from './keycloak.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([])), // Add interceptors if needed
    provideKeycloak({
      config: environment.keycloak,
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        checkLoginIframe: true,
        scope: 'openid profile email phone',
        pkceMethod: 'S256'
      }
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAppInitializer(() => {
      // Initialization logic if needed
    })
  ]
};

