import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InformationMessage } from '@profile/core/models/information-message';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from './routing.service';

@Injectable()
export class InformationMessageService {

    public constructor(private routingService: RoutingService, private httpClient: HttpClient) { }

    public getAll(): Observable<InformationMessage[]> {
        return this.httpClient
            .get<InformationMessage[]>(this.routingService.getInformationMessagesUrl())
            .pipe(
                map(messages => {
                    for (let message of messages) {
                        message.dateUpdated = new Date(message.dateUpdated);
                        message.datePublished = new Date(message.datePublished);
                    }

                    return messages;
                })
            );
    }

    public get(informationMessageId: string): Observable<InformationMessage> {
        return this.httpClient.get<InformationMessage>(this.routingService.getInformationMessagesUrl() + informationMessageId);
    }

}