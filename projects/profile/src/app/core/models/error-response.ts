import { HttpErrorResponse } from '@angular/common/http';
import { ErrorCode } from '../enums/error-code';

export class ErrorResponse {
    private response: HttpErrorResponse
    private error: ErrorCode = 'None';

    constructor(response: HttpErrorResponse) {
        this.response = response;

        if (typeof response.error === 'string') {
            this.error = response.error as ErrorCode;
        }
    }

    get status(): number {
        return this.response.status;
    }

    get errorCode(): ErrorCode {
        return this.error;
    }
}