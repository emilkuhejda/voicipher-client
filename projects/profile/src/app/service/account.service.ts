import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeSpanWrapper } from '@profile/core/utils/time-span-wrapper';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { RoutingService } from './routing.service';

@Injectable()
export class AccountService {

    public constructor(private routingService: RoutingService, private httpClient: HttpClient) { }

    public getSubscriptionRemainingTime(): Observable<TimeSpanWrapper> {
        return this.httpClient.get<TimeSpanWrapper>(this.routingService.getSubscriptionRemainingTimeUrl())
            .pipe(map(response => new TimeSpanWrapper(response.ticks)));
    }

}