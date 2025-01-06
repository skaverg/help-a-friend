import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAppInitializer, inject } from '@angular/core';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { ConfigService } from './core/services/config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    ConfigService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAppInitializer((() => inject(ConfigService).loadConfig()))
  ]
};
