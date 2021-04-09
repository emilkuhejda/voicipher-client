import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Identity, UserRegistration } from '@profile/core/models';
import { UserRegistrationInputModel, UpdateUserInputModel } from '@profile/core/models/input-models';
import { TimeSpanWrapper } from '@profile/core/utils/time-span-wrapper';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { MsalService } from './msal.service';
import { RoutingService } from './routing.service';

@Injectable()
export class AccountService {

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

    public updateUser(updateUserInputModel: UpdateUserInputModel): Observable<Identity> {
        return this.httpClient.put<Identity>(this.routingService.getUpdateUserUrl(), updateUserInputModel);
    }

    public getSubscriptionRemainingTime(): Observable<TimeSpanWrapper> {
        return this.httpClient.get<TimeSpanWrapper>(this.routingService.getSubscriptionRemainingTimeUrl())
            .pipe(map(response => new TimeSpanWrapper(response.ticks)));
    }

}
