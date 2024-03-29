import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FileFormModel } from '@profile/components/file-form/file-form.model';
import { TimeSpanWrapper } from '@profile/core/utils/time-span-wrapper';
import { AudioFilePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getCurrentAudioFile } from '@profile/state/selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-file-edit',
    templateUrl: './file-edit.component.html',
    styleUrls: ['./file-edit.component.scss']
})
export class FileEditComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public fileFormModel: FileFormModel | undefined = undefined;

    public constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        const audioFileId = this.route.snapshot.params.fileId;
        this.store.dispatch(AudioFilePageAction.loadCurrentAudioFileRequest({ audioFileId }));
        this.store
            .select(getCurrentAudioFile)
            .pipe(takeUntil(this.destroy$))
            .subscribe(audioFile => {
                if (audioFile) {
                    this.fileFormModel = {
                        id: audioFile.id,
                        name: audioFile.name,
                        fileName: audioFile.fileName,
                        language: audioFile.language,
                        audioType: audioFile.isPhoneCall ? '1' : '0',
                        transcriptionStartTime: new TimeSpanWrapper(audioFile.transcriptionStartTimeTicks).getTotalSeconds(true).toString(),
                        transcriptionEndTime: new TimeSpanWrapper(audioFile.transcriptionEndTimeTicks).getTotalSeconds(true).toString()
                    };
                }
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

}
