import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AudioFilePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getAudioFiles, getAudioFileViewModels } from '@profile/state/selectors';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { SendEmailDialogComponent } from '@profile/components/send-email-dialog/send-email-dialog.component';
import { TranscribeDialogComponent } from '@profile/components/transcribe-dialog/transcribe-dialog.component';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { AudioFileViewModel } from '@profile/core/models/view-models';

@Component({
    selector: 'app-file-overview',
    templateUrl: './file-overview.component.html',
    styleUrls: ['./file-overview.component.scss']
})
export class FileOverviewComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public audioFile$: Observable<AudioFileViewModel[]> | undefined;

    public constructor(
        private store: Store<AppState>,
        private router: Router,
        private confirmationService: ConfirmationService,
        private dialogService: DialogService,
        private translateService: TranslateService) { }

    public ngOnInit(): void {
        this.store.dispatch(AudioFilePageAction.loadAudioFilesRequest());
        this.audioFile$ = this.store
            .select(getAudioFileViewModels)
            .pipe(map(audioFiles => audioFiles.slice().sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime())));

        this.store.select(getAudioFiles)
            .pipe(
                takeUntil(this.destroy$),
                map(audioFiles => audioFiles.filter(audioFile => audioFile.recognitionStateString === 'InProgress')),
                filter(audioFiles => audioFiles.length > 0)
            )
            .subscribe(audioFiles => audioFiles
                .forEach(audioFile => this.store.dispatch(AudioFilePageAction.LoadProcessingProgressRequest({
                    audioFileId: audioFile.id
                }))));
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    public navigateToPage(path: string, audioFileId: string): void {
        this.router.navigate([path, audioFileId]);
    }

    public transcribe(audioFileViewModel: AudioFileViewModel): void {
        this.translateService
            .get('TranscribeDialog.Header', { fileName: audioFileViewModel.name })
            .subscribe(translation => {
                this.dialogService.open(TranscribeDialogComponent, {
                    data: { audioFile: audioFileViewModel.audioFile },
                    header: translation,
                    width: '50%',
                    contentStyle: { 'max-height': '500px' },
                    baseZIndex: 10000
                });
            });
    }

    public sendEmail(audioFileViewModel: AudioFileViewModel): void {
        this.translateService
            .get('EmailForm.Header')
            .subscribe(translation => {
                this.dialogService.open(SendEmailDialogComponent, {
                    data: { audioFile: audioFileViewModel.audioFile },
                    header: translation,
                    width: '50%',
                    contentStyle: { 'max-height': '500px' },
                    baseZIndex: 10000
                });
            });
    }

    public delete(event: Event, audioFileViewModel: AudioFileViewModel): void {
        this.translateService
            .get('FilesPage.DeleteActionMessage', { fileName: audioFileViewModel.name })
            .subscribe(translation => {
                this.confirmationService.confirm({
                    target: event.target ?? undefined,
                    message: translation,
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        this.store.dispatch(AudioFilePageAction.deleteAudioFileRequest({
                            audioFile: audioFileViewModel.audioFile
                        }));
                    }
                });
            });
    }

}
