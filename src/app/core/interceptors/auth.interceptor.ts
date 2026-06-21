import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.includes('/login') || req.url.includes('/signup')){
    return next(req);
  }

  const router = inject(Router);

  const token = localStorage.getItem("token");

  if(token){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401){
        localStorage.removeItem("token");
        router.navigate(['/login']);
      }
      
       return throwError(() => error);
    })
  );
};
