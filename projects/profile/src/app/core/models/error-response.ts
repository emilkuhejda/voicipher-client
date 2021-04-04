import { HttpErrorResponse } from '@angular/common/http';
import { ErrorCode, errorCodes } from '../types/error-code';

export class ErrorResponse {
    private response: HttpErrorResponse;
    private error: ErrorCode = 'None';

    public constructor(response: HttpErrorResponse) {
        this.response = response;

        if (typeof response.error === 'string') {
            const error = response.error as ErrorCode;
            this.error = errorCodes.includes(error) ? error : 'None';
        }
    }

    public get status(): number {
        return this.response.status;
    }

    public get errorCode(): ErrorCode {
        return this.error;
    }
}
