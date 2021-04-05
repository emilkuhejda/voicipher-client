import { Component, Input, OnInit } from '@angular/core';
import { TranscribeItemViewModel } from './transcribe-item-view.model';

@Component({
    selector: 'app-transcribe-item',
    templateUrl: './transcribe-item.component.html',
    styleUrls: ['./transcribe-item.component.scss']
})
export class TranscribeItemComponent implements OnInit {

    @Input()
    public transcribeItem: TranscribeItemViewModel | undefined;

    public constructor() { }

    public ngOnInit(): void {
    }

    public restrictAudio(audio: any): void { }

    public update(): void { }

    public loadAudioFile(): void { }

    public refresh(): void { }

    public onChange(): void {
        if (!this.transcribeItem) {
            return;
        }

        this.transcribeItem.isDirty = true;
    }

}
