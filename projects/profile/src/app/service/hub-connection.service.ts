import * as signalR from '@aspnet/signalr';
import { Injectable } from '@angular/core';
import { RoutingService } from './routing.service';
import { Identity } from '@profile/core/models';
import { StorageService } from './storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '@profile/state/app.state';
import { AudioFilePageAction } from '@profile/state/actions';
import { CacheItem } from '@profile/core/models/cache-item';
import { RecognitionState } from '@profile/core/types/recognition-state';

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

        this.hubConnection.on(`${this.recognitionProgressChangedMethod}-${this.identity.id}`,
            (cacheItem: CacheItem) => this.onRecognitionProgressChanged(cacheItem));
        this.hubConnection.on(`${this.filesListChangedMethod}-${this.identity.id}`, () => this.onFilesListChanged());
        this.hubConnection.on(`${this.recognitionStateChangedMethod}-${this.identity.id}`,
            (audioFileId: string, recognitionState: RecognitionState) => this.onRecognitionStateChanged(audioFileId, recognitionState));
        this.hubConnection.on(`${this.recognitionErrorMethod}-${this.identity.id}`,
            (fileName: string) => this.onRecognitionError(fileName));
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

    private onRecognitionProgressChanged(cacheItem: CacheItem): void {
        console.log('recognition changed');
        console.log(cacheItem);
    }

    private onFilesListChanged(): void {
        this.store.dispatch(AudioFilePageAction.loadAudioFilesRequest());
    }

    private onRecognitionStateChanged(audioFileId: string, recognitionState: RecognitionState): void {
        console.log('recognition state changed');
        console.log(audioFileId);
        console.log(recognitionState);
    }

    private onRecognitionError(fileName: string): void {
        console.log('recognition error');
        console.log(fileName);
    }

}
