import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AudioFilePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getAudioFiles } from '@profile/state/selectors/audio-file.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AudioFileViewModel } from './audio-file.view.model';

@Component({
    selector: 'app-file-overview',
    templateUrl: './file-overview.component.html',
    styleUrls: ['./file-overview.component.scss']
})
export class FileOverviewComponent implements OnInit {

    public audioFile$: Observable<AudioFileViewModel[]> | undefined;

    public constructor(private store: Store<AppState>) { }

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

    public transcribe(audioFileViewModel: AudioFileViewModel): void {
        console.log(audioFileViewModel);
    }

    public sendEmail(audioFileViewModel: AudioFileViewModel): void {
        console.log(audioFileViewModel);
    }

    public delete(audioFileViewModel: AudioFileViewModel) {
        console.log(audioFileViewModel);
    }

}
