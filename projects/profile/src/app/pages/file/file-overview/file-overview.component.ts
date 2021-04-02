import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AudioFile } from '@profile/core/models/audio-file';
import { AudioFilePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getAudioFiles } from '@profile/state/selectors/audio-file.selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-file-overview',
    templateUrl: './file-overview.component.html',
    styleUrls: ['./file-overview.component.scss']
})
export class FileOverviewComponent implements OnInit {

    public audioFile$: Observable<AudioFile[]> | undefined;

    public constructor(private store: Store<AppState>) { }

    public ngOnInit(): void {
        this.store.dispatch(AudioFilePageAction.loadAudioFilesRequest());
        this.audioFile$ = this.store.select(getAudioFiles);
    }

}
