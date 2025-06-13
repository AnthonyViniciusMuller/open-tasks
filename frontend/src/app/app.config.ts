import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth';
import { MAT_DATE_FNS_FORMATS, provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ptBR } from 'date-fns/locale';
import { RefreshInterceptor } from './interceptors/refresh';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

const datePicker = [
  provideDateFnsAdapter(),
  { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
  { provide: MAT_DATE_LOCALE, useValue: ptBR },
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([RefreshInterceptor, AuthInterceptor])),
    provideAnimationsAsync(),
    ...datePicker,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 }}
  ]
};
