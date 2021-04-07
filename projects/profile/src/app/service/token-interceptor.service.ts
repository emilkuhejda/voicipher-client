import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MsalService } from './msal.service';

@Injectable()
export class TokenInterceptorService {

    public constructor(private msalService: MsalService) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.msalService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    authorization: 'Bearer ' + token
                }
            });
        }

        return next.handle(request);
    }

}
