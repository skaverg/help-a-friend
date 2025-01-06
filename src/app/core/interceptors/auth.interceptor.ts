import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '../services/config.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let cloneReq = req;
  const configService = inject(ConfigService);
  if (configService.get('token')) {
    cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${configService.get('token')}`
      }
    });
  }
  return next(cloneReq);
};
