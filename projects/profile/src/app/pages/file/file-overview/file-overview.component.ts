import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AudioFilePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getAudioFiles } from '@profile/state/selectors';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AudioFileViewModel } from './audio-file.view.model';
import { DialogService } from 'primeng/dynamicdialog';
import { SendEmailDialogComponent } from '@profile/components/send-email-dialog/send-email-dialog.component';
import { TranscribeDialogComponent } from '@profile/components/transcribe-dialog/transcribe-dialog.component';

@Component({
    selector: 'app-file-overview',
    templateUrl: './file-overview.component.html',
    styleUrls: ['./file-overview.component.scss']
})
export class FileOverviewComponent implements OnInit {

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
            .select(getAudioFiles)
            .pipe(
                map(audioFiles =>
                    audioFiles
                        .slice()
                        .sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime())
                        .map(x => new AudioFileViewModel(x)))
            );
    }

    public navigateToPage(path: string, audioFileId: string) {
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

    public delete(event: Event, audioFileViewModel: AudioFileViewModel) {
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
