import { Injectable } from '@angular/core';
import { environment } from '@profile/environment';

@Injectable()
export class RoutingService {

    getRegisterUserUrl(): string {
        return environment.webApiUrl + 'api/b2c/v1/users/register/';
    }

}