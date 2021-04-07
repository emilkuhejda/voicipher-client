import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Identity } from '@profile/core/models';
import { UpdateUserInputModel } from '@profile/core/models/input-models/update-user.input.Model';
import { TimeSpanWrapper } from '@profile/core/utils/time-span-wrapper';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { RoutingService } from './routing.service';

@Injectable()
export class AccountService {

    public constructor(private routingService: RoutingService, private httpClient: HttpClient) { }

    public updateUser(updateUserInputModel: UpdateUserInputModel): Observable<Identity> {
        return this.httpClient.put<Identity>(this.routingService.getUpdateUserUrl(), updateUserInputModel);
    }

    public getSubscriptionRemainingTime(): Observable<TimeSpanWrapper> {
        return this.httpClient.get<TimeSpanWrapper>(this.routingService.getSubscriptionRemainingTimeUrl())
            .pipe(map(response => new TimeSpanWrapper(response.ticks)));
    }

}