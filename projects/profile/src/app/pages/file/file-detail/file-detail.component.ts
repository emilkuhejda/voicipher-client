import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { SendEmailDialogComponent } from '@profile/components/send-email-dialog/send-email-dialog.component';
import { TranscribeItemViewModel } from '@profile/components/transcribe-item/transcribe-item-view.model';
import { AudioFile } from '@profile/core/models/audio-file';
import { AudioFilePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getCurrentAudioFile, getCurrentTranscribeItems } from '@profile/state/selectors';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-file-detail',
    templateUrl: './file-detail.component.html',
    styleUrls: ['./file-detail.component.scss']
})
export class FileDetailComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public audioFile$: Observable<AudioFile | undefined> | undefined;
    public transcribeItem$: Observable<TranscribeItemViewModel[]> | undefined;

    public constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private dialogService: DialogService,
        private translateService: TranslateService) { }

    public ngOnInit(): void {
        const audioFileId = this.route.snapshot.params.fileId;
        this.store.dispatch(AudioFilePageAction.loadCurrentAudioFileRequest({ audioFileId }));
        this.store.dispatch(AudioFilePageAction.loadCurrentTranscribeItemsRequest({ audioFileId }));
        this.audioFile$ = this.store.select(getCurrentAudioFile);
        this.transcribeItem$ = this.store.select(getCurrentTranscribeItems)
            .pipe(
                takeUntil(this.destroy$),
                map(transcribeItems => transcribeItems.map(x => new TranscribeItemViewModel(x)))
            );
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    public sendToMail(audioFile: AudioFile): void {
        this.translateService
            .get('EmailForm.Header')
            .subscribe(translation => {
                this.dialogService.open(SendEmailDialogComponent, {
                    data: { audioFile },
                    header: translation,
                    width: '50%',
                    contentStyle: { 'max-height': '500px' },
                    baseZIndex: 10000
                });
            });
    }

}
