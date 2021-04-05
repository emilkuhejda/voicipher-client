import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AudioFilePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { TranscribeItemViewModel } from './transcribe-item-view.model';

@Component({
    selector: 'app-transcribe-item',
    templateUrl: './transcribe-item.component.html',
    styleUrls: ['./transcribe-item.component.scss']
})
export class TranscribeItemComponent implements OnInit {

    @Input()
    public transcribeItem: TranscribeItemViewModel | undefined;

    public constructor(private store: Store<AppState>) { }

    public ngOnInit(): void {
    }

    public restrictAudio(audio: any): void {
        console.log('restrictAudio');
    }

    public update(): void {
        console.log('update');
    }

    public loadAudioFile(): void {
        if (!this.transcribeItem) {
            return;
        }

        this.transcribeItem.isLoading = true;

        this.store.dispatch(AudioFilePageAction.loadCurrentAudioSourceRequest({ transcribeItemId: this.transcribeItem.id }))
    }

    public refresh(): void {
        this.transcribeItem?.refreshTranscript();
    }

    public onChange(): void {
        if (!this.transcribeItem) {
            return;
        }

        this.transcribeItem.isDirty = true;
    }

}
