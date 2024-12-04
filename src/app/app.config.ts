import { ApplicationConfig, provideZoneChangeDetection, ValueProvider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';

const SNACK_BAR_CONFIG: ValueProvider = {
  provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
  useValue: {
    duration: 5000,
  } as MatSnackBarConfig,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideAnimationsAsync(),
    provideHttpClient(),
    SNACK_BAR_CONFIG
  ]
};
