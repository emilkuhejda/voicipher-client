import * as signalR from '@aspnet/signalr';
import { Injectable } from '@angular/core';
import { RoutingService } from './routing.service';
import { Identity } from '@profile/core/models';
import { StorageService } from './storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '@profile/state/app.state';

@Injectable()
export class HubConnectionService {

    private recognitionProgressChangedMethod: string = "recognition-progress";
    private filesListChangedMethod: string = "file-list";
    private recognitionStateChangedMethod: string = "recognition-state";
    private recognitionErrorMethod: string = "recognition-error";

    private hubConnection: signalR.HubConnection | undefined;
    private identity: Identity | null = null;

    public constructor(
        private store: Store<AppState>,
        private RoutingService: RoutingService,
        private storageService: StorageService) { }

    public startConnection(): void {
        if (this.hubConnection !== undefined) {
            return;
        }

        this.identity = this.storageService.getItem<Identity>('identity');
        if (!this.identity) {
            return;
        }

        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.RoutingService.getMessageHubUrl())
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.hubConnection.start();

        this.hubConnection.on(`${this.recognitionProgressChangedMethod}-${this.identity.id}`, this.onRecognitionProgressChanged);
        this.hubConnection.on(`${this.filesListChangedMethod}-${this.identity.id}`, this.onFilesListChanged);
        this.hubConnection.on(`${this.recognitionStateChangedMethod}-${this.identity.id}`, this.onRecognitionStateChanged);
        this.hubConnection.on(`${this.recognitionErrorMethod}-${this.identity.id}`, this.onRecognitionError);
    }

    public stopConnection(): void {
        if (!this.hubConnection) {
            return;
        }

        this.hubConnection.stop();

        if (this.identity) {
            this.hubConnection.off(`${this.recognitionProgressChangedMethod}-${this.identity.id}`);
            this.hubConnection.off(`${this.filesListChangedMethod}-${this.identity.id}`);
            this.hubConnection.off(`${this.recognitionStateChangedMethod}-${this.identity.id}`);
            this.hubConnection.off(`${this.recognitionErrorMethod}-${this.identity.id}`);
        }

        this.hubConnection = undefined;
    }

    private onRecognitionProgressChanged(): void {
        console.log('recognition changed');
    }

    private onFilesListChanged(): void {
        console.log('file list changed');
    }

    private onRecognitionStateChanged(): void {
        console.log('recognition state changed');
    }

    private onRecognitionError(): void {
        console.log('recognition error');
    }

}
