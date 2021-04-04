import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AudioFile } from '@profile/core/models/audio-file';
import { RecycleBinPageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getRecycleBinAudioFiles } from '@profile/state/selectors/recycle-bin.selectors';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-recycle-bin',
    templateUrl: './recycle-bin.component.html',
    styleUrls: ['./recycle-bin.component.scss']
})
export class RecycleBinComponent implements OnInit {

    public audioFile$: Observable<AudioFile[]> | undefined;

    public constructor(
        private store: Store<AppState>,
        private confirmationService: ConfirmationService,
        private translateService: TranslateService) { }

    public ngOnInit(): void {
        this.store.dispatch(RecycleBinPageAction.loadAudioFilesRequest());

        this.audioFile$ = this.store.select(getRecycleBinAudioFiles);
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

    public restoreAll(): void { }

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

    public deleteAll(): void { }

}
