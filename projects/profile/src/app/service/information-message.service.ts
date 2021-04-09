import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InformationMessage, InformationMessageConvert } from '@profile/core/models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from './routing.service';
import { StorageService } from './storage.service';

@Injectable()
export class InformationMessageService {

    public constructor(
        private routingService: RoutingService,
        private storageService: StorageService,
        private httpClient: HttpClient) { }

    public getAll(): Observable<InformationMessage[]> {
        return this.httpClient
            .get<InformationMessage[]>(this.routingService.getInformationMessagesUrl())
            .pipe(map(messages => messages.map(x => {
                const openedMessages = this.storageService.getItem<string[]>('opened.messages') ?? [];
                return this.mapMessage(x, openedMessages);
            })));
    }

    public get(informationMessageId: string): Observable<InformationMessage> {
        return this.httpClient.get<InformationMessage>(this.routingService.getInformationMessagesUrl() + informationMessageId);
    }

    public markAsOpened(message: InformationMessage): Observable<InformationMessage> {
        let params = new HttpParams();
        params = params.append('informationMessageId', message.id);
        return this.httpClient
            .put<InformationMessage>(this.routingService.getMarkMessageAsOpenedUrl(), null, { params })
            .pipe(map(informationMessage => {
                const openedMessages = this.storageService.getItem<string[]>('opened.messages') ?? [];
                return this.mapMessage(informationMessage, openedMessages);
            }));
    }

    public markAsOpenedLocally(message: InformationMessage): Observable<InformationMessage> {
        const openedMessages = this.storageService.getItem<string[]>('opened.messages') ?? [];
        if (!openedMessages.includes(message.id)) {
            openedMessages.push(message.id);
        }

        this.storageService.setItem('opened.messages', openedMessages);

        return of({
            ...message,
            wasOpened: true
        });
    }

    private mapMessage(message: InformationMessage, openedMessages: string[]): InformationMessage {
        const wasOpened = openedMessages.includes(message.id);
        return InformationMessageConvert.toInformationMessage(message, wasOpened);
    }

}
