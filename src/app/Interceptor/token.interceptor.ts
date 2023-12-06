import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _storage: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
       const myToken = this._storage.getToken();

    if (this.isHeaderNeeded(request.url) && myToken) {
      
        const cloned = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + myToken),
        });
        return next.handle(cloned);
      }

    return next.handle(request);
  }

  isHeaderNeeded(url: string) {
    if (url === environment.uploadUrl) {
      return false;
    } else {
      return true;
    }
  }
  }
