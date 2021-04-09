import * as signalR from '@aspnet/signalr';
import { Injectable } from '@angular/core';
import { RoutingService } from './routing.service';
import { Identity, ProcessingProgress } from '@profile/core/models';
import { StorageService } from './storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '@profile/state/app.state';
import { AudioFilePageAction } from '@profile/state/actions';
import { RecognitionState } from '@profile/core/types/recognition-state';

@Injectable()
export class HubConnectionService {

    private retryDelays: number[] = [
        10 * 1000, // 10 seconds
        30 * 1000, // 30 seconds
        60 * 1000, // 1 minute
        300 * 1000, // 5 minutes
        600 * 1000 // 10 minutes
    ];

    private recognitionProgressChangedMethod: string = 'recognition-progress';
    private filesListChangedMethod: string = 'file-list';
    private recognitionStateChangedMethod: string = 'recognition-state';
    private recognitionErrorMethod: string = 'recognition-error';

    private hubConnection: signalR.HubConnection | undefined;
    private identity: Identity | null = null;

    public constructor(
        private store: Store<AppState>,
        private routingService: RoutingService,
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
            .withUrl(this.routingService.getMessageHubUrl())
            .withAutomaticReconnect(this.retryDelays)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.hubConnection.start();

        this.hubConnection.on(`${this.recognitionProgressChangedMethod}-${this.identity.id}`,
            (processingProgress: ProcessingProgress) => this.onRecognitionProgressChanged(processingProgress));
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

    private onRecognitionProgressChanged(processingProgress: ProcessingProgress): void {
        this.store.dispatch(AudioFilePageAction.changeRecognitionProgressRequest({ processingProgress }));
    }

    private onFilesListChanged(): void {
        this.store.dispatch(AudioFilePageAction.loadAudioFilesRequest());
    }

    private onRecognitionStateChanged(audioFileId: string, recognitionState: RecognitionState): void {
        this.store.dispatch(AudioFilePageAction.changeRecognitionStateRequest({ audioFileId, recognitionState }));
    }

    private onRecognitionError(fileName: string): void {
        this.store.dispatch(AudioFilePageAction.displayRecognitionErrorRequest({ fileName }));
    }

}
