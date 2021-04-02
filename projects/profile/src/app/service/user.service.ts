import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration } from '@profile/core/models';
import { UserRegistrationInputModel } from '@profile/core/models/input-models';
import { Observable } from 'rxjs';
import { MsalService } from './msal.service';
import { RoutingService } from './routing.service';

@Injectable()
export class UserService {
    public constructor(
        private routingService: RoutingService,
        private msalService: MsalService,
        private httpClient: HttpClient) { }

    public registerUser(userRegistrationInputModel: UserRegistrationInputModel): Observable<UserRegistration> {
        const headers = {
            headers: {
                authorization: `Bearer ${this.msalService.getB2CToken()}`
            }
        };

        return this.httpClient.post<UserRegistration>(this.routingService.getRegisterUserUrl(), userRegistrationInputModel, headers);
    }
}
