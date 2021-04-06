import { Component } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AudioFile } from '@profile/core/models/audio-file';
import { TimeSpanWrapper } from '@profile/core/utils/time-span-wrapper';
import { AppState } from '@profile/state/app.state';
import { Message, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-transcribe-dialog',
    templateUrl: './transcribe-dialog.component.html',
    styleUrls: ['./transcribe-dialog.component.scss']
})
export class TranscribeDialogComponent {

    private emptyTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

    private audioFile: AudioFile;

    public isTimeFrame: boolean;
    public startTime: NgbTimeStruct;
    public endTime: NgbTimeStruct;
    private totalTime: NgbTimeStruct;
    private totalTimeSeconds: number;
    public loading: boolean = false;

    public constructor(
        private store: Store<AppState>,
        private config: DynamicDialogConfig,
        private dialogRef: DynamicDialogRef,
        private messageService: MessageService,
        private translateService: TranslateService) {
        const audioFile = this.config.data.audioFile as AudioFile;
        const totalTime = new TimeSpanWrapper(audioFile.totalTimeTicks);

        this.audioFile = audioFile;
        this.isTimeFrame = audioFile.transcriptionStartTimeTicks > 0 || audioFile.transcriptionEndTimeTicks > 0;
        this.startTime = this.isTimeFrame
            ? this.convertToModel(new TimeSpanWrapper(audioFile.transcriptionStartTimeTicks).getTotalSeconds(true))
            : { ...this.emptyTime };
        this.endTime = this.isTimeFrame
            ? this.convertToModel(new TimeSpanWrapper(audioFile.transcriptionEndTimeTicks).getTotalSeconds(true))
            : { ...this.emptyTime };

        this.totalTimeSeconds = totalTime.getTotalSeconds(true);
        this.totalTime = this.convertToModel(this.totalTimeSeconds);
    }

    public onTimeChange() {
        this.validateTimes();
    }

    public transcribe() {
        const transcriptionStartSeconds = this.convertToSeconds(this.startTime);
        const transcriptionEndSeconds = this.convertToSeconds(this.endTime);
        if (this.isTimeFrame && transcriptionStartSeconds >= transcriptionEndSeconds) {
            this.translateService
                .get('ErrorMessage')
                .subscribe(translation => {
                    this.messageService.add({
                        key: 'error-dialog',
                        severity: 'error',
                        detail: translation
                    });
                });
            return;
        }
    }

    public close() {
        this.dialogRef.close();
    }

    private validateTimes(): void {
        if (!this.startTime) {
            this.startTime = { ...this.emptyTime };
        }

        if (!this.endTime) {
            this.endTime = { ...this.totalTime };
        }

        var startTimeSeconds = this.convertToSeconds(this.startTime);
        var endTimeSeconds = this.convertToSeconds(this.endTime);

        if (endTimeSeconds > this.totalTimeSeconds) {
            this.endTime = { ...this.totalTime };
            endTimeSeconds = this.totalTimeSeconds;
        }

        if (startTimeSeconds > endTimeSeconds) {
            if (endTimeSeconds > 0) {
                this.startTime = this.convertToModel(endTimeSeconds - 1);
            } else {
                this.startTime = { ...this.endTime };
            }
        }
    }

    private convertToSeconds(timeStruct: NgbTimeStruct): number {
        return (timeStruct.hour * 3600) + (timeStruct.minute * 60) + timeStruct.second;
    }

    private convertToModel(seconds: number): NgbTimeStruct {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds - (hours * 3600)) / 60);
        const second = seconds - (hours * 3600) - (minutes * 60);

        return {
            hour: hours,
            minute: minutes,
            second: second
        }
    }

}
