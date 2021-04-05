import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InformationMessage } from '@profile/core/models/information-message';
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
            .put<InformationMessage>(this.routingService.getMarkMessageAsOpenedUrl(), null, { params: params })
            .pipe(map(message => {
                const openedMessages = this.storageService.getItem<string[]>('opened.messages') ?? [];
                return this.mapMessage(message, openedMessages);
            }));
    }

    public markAsOpenedLocally(message: InformationMessage): Observable<InformationMessage> {
        let openedMessages = this.storageService.getItem<string[]>('opened.messages') ?? [];
        if (!openedMessages.includes(message.id)) {
            openedMessages.push(message.id);
        }

        this.storageService.setItem('opened.messages', openedMessages);
        return of(message);
    }

    private mapMessage(message: InformationMessage, openedMessages: string[]): InformationMessage {
        message.dateUpdated = new Date(message.dateUpdated);
        message.datePublished = new Date(message.datePublished);
        message.wasOpened = openedMessages.includes(message.id)
        return message;
    }

}