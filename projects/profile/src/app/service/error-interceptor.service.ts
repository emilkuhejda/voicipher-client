import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorResponse } from '@profile/core/models/error-response';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MsalService } from './msal.service';

@Injectable()
export class ErrorInterceptorService {

    public constructor(private msalService: MsalService) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401 || err.status === 403) {
                    this.msalService.logout();
                }

                const errorResponse = new ErrorResponse(err);
                return throwError(errorResponse);
            })
        );
    }

}
