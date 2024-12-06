import {ApplicationConfig, provideZoneChangeDetection, inject} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideNativeDateAdapter} from '@angular/material/core';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideApollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {ApolloLink, InMemoryCache} from '@apollo/client/core';
import {setContext} from '@apollo/client/link/context';
import {serverErrorInterceptor} from './core/interceptors/server-error.interceptor';
import {environment} from '../environments/environment';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync('animations'),
    provideNativeDateAdapter(),
    provideHttpClient(
      withInterceptors([serverErrorInterceptor])
    ),
    provideApollo(() => {

      const httpLink = inject(HttpLink);

      const auth = setContext(() => {

        const token = environment.API_TOKEN;

        if (token === null) {
          return {};
        } else {
          return {headers: {Authorization: `Bearer ${token}`}};
        }

      });

      return {
        link: ApolloLink.from([auth, httpLink.create({uri: environment.API_URL})]),
        cache: new InMemoryCache(),
        devtools: {enabled: !environment.production},
      };

    })]
};
