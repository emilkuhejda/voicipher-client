import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AudioFile } from '@profile/core/models';
import { RecycleBinPageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getRecycleBinAudioFiles } from '@profile/state/selectors';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

type ActionType = 'restoreAll' | 'deleteAll';

@Component({
    selector: 'app-recycle-bin',
    templateUrl: './recycle-bin.component.html',
    styleUrls: ['./recycle-bin.component.scss']
})
export class RecycleBinComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    private confirmDialogKey: string = 'confirm-toast';

    public audioFiles: AudioFile[] = [];

    public constructor(
        private store: Store<AppState>,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private translateService: TranslateService) { }

    public ngOnInit(): void {
        this.store.dispatch(RecycleBinPageAction.loadAudioFilesRequest());

        this.store.select(getRecycleBinAudioFiles)
            .pipe(takeUntil(this.destroy$))
            .subscribe(audioFiles => this.audioFiles = audioFiles);
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    public restore(event: Event, audioFile: AudioFile): void {
        this.translateService
            .get('RecycleBinPage.RestoreMessage', { fileName: audioFile.name })
            .subscribe(translation => {
                this.confirmationService.confirm({
                    target: event.target ?? undefined,
                    message: translation,
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        this.store.dispatch(RecycleBinPageAction.restoreAudioFilesRequest({ audioFileIds: [audioFile.id] }));
                    }
                });
            });
    }

    public restoreAll(): void {
        this.translateService
            .get(['RecycleBinPage.Summary', 'RecycleBinPage.RestoreAllMessage'])
            .subscribe(translations => {
                this.messageService.add({
                    key: this.confirmDialogKey,
                    sticky: true,
                    severity: 'warn',
                    summary: translations['RecycleBinPage.Summary'],
                    detail: translations['RecycleBinPage.RestoreAllMessage'],
                    data: 'restoreAll' as ActionType
                });
            });
    }

    public delete(event: Event, audioFile: AudioFile): void {
        this.translateService
            .get('RecycleBinPage.DeleteMessage', { fileName: audioFile.name })
            .subscribe(translation => {
                this.confirmationService.confirm({
                    target: event.target ?? undefined,
                    message: translation,
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        this.store.dispatch(RecycleBinPageAction.permanentDeleteAudioFilesRequest({ audioFileIds: [audioFile.id] }));
                    }
                });
            });
    }

    public deleteAll(): void {
        this.translateService
            .get(['RecycleBinPage.Summary', 'RecycleBinPage.DeleteAllMessage'])
            .subscribe(translations => {
                this.messageService.add({
                    key: this.confirmDialogKey,
                    sticky: true,
                    severity: 'warn',
                    summary: translations['RecycleBinPage.Summary'],
                    detail: translations['RecycleBinPage.DeleteAllMessage'],
                    data: 'deleteAll' as ActionType
                });
            });
    }

    public onConfirm(actionType: ActionType): void {
        const audioFileIds = this.audioFiles.map(x => x.id);

        switch (actionType) {
            case 'restoreAll':
                this.store.dispatch(RecycleBinPageAction.restoreAudioFilesRequest({ audioFileIds }));
                break;
            case 'deleteAll':
                this.store.dispatch(RecycleBinPageAction.permanentDeleteAudioFilesRequest({ audioFileIds }));
                break;
        }

        this.messageService.clear(this.confirmDialogKey);
    }

    public onReject(): void {
        this.messageService.clear(this.confirmDialogKey);
    }

}
