import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AudioFile } from '@profile/core/models/audio-file';
import { RecycleBinPageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getRecycleBinAudioFiles } from '@profile/state/selectors/recycle-bin.selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-recycle-bin',
    templateUrl: './recycle-bin.component.html',
    styleUrls: ['./recycle-bin.component.scss']
})
export class RecycleBinComponent implements OnInit {

    public audioFile$: Observable<AudioFile[]> | undefined;

    public constructor(private store: Store<AppState>) { }

    public ngOnInit(): void {
        this.store.dispatch(RecycleBinPageAction.loadAudioFilesRequest());

        this.audioFile$ = this.store.select(getRecycleBinAudioFiles);
    }

    public restore(audioFile: AudioFile): void { }

    public restoreAll(): void { }

    public delete(audioFile: AudioFile): void { }

    public deleteAll(): void { }

}
