import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from './msal.service';

@Injectable()
export class TokenInterceptorService {

    public constructor(private msalService: MsalService) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler) {
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
