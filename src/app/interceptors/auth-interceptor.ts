import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceExtended } from '@zyazilim/online-ihale-data';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public auth: AuthServiceExtended) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getToken() && this.auth.getToken().accessToken;
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next.handle(request);
    }
}
