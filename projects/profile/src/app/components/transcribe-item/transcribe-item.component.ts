import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AudioFilePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getCurrentBlobAudioSource } from '@profile/state/selectors';
import { TranscribeItemViewModel } from './transcribe-item-view.model';

@Component({
    selector: 'app-transcribe-item',
    templateUrl: './transcribe-item.component.html',
    styleUrls: ['./transcribe-item.component.scss']
})
export class TranscribeItemComponent implements OnInit {

    @Input()
    public transcribeItem: TranscribeItemViewModel | undefined;

    public constructor(private store: Store<AppState>, private sanitizer: DomSanitizer) { }

    public ngOnInit(): void {
        this.store.select(getCurrentBlobAudioSource).subscribe(source => {
            if (this.transcribeItem && source.transcribeItemId === this.transcribeItem.id) {
                this.transcribeItem.isLoading = false;
                this.transcribeItem.source = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(source.blob));
            }
        });
    }

    public restrictAudio(audio: HTMLMediaElement): void {
        const stopAudioAfter: number = 57.8;
        if (audio.currentTime >= stopAudioAfter) {
            audio.pause();
            audio.currentTime = 0;
        }
    }

    public update(): void {
        if (!this.transcribeItem) {
            return;
        }

        this.store.dispatch(AudioFilePageAction.updateTranscriptRequest({
            transcribeItemId: this.transcribeItem.id,
            transcript: this.transcribeItem.userTranscript
        }));
    }

    public loadAudioFile(): void {
        if (!this.transcribeItem) {
            return;
        }

        this.transcribeItem.isLoading = true;

        this.store.dispatch(AudioFilePageAction.loadCurrentAudioBlobSourceRequest({ transcribeItemId: this.transcribeItem.id }))
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
function getCurrentAudioBlobSource(getCurrentAudioBlobSource: any) {
    throw new Error('Function not implemented.');
}

