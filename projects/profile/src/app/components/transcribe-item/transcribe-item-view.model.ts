import { RecognitionAlternative } from "@profile/core/models/recognition-alternative";
import { TranscribeItem } from "@profile/core/models/transcribe-item";
import { TimeSpanWrapper } from "@profile/core/utils/time-span-wrapper";

export class TranscribeItemViewModel {
    private readonly transcript: string;
    private transcribeItem: TranscribeItem;

    public id: string;
    public userTranscript: string;
    public time: string;
    public isIncomplete: boolean;
    public wasCleaned: boolean;
    public confidence: number;
    public source: any;
    public isDirty: boolean = false;
    public isLoading: boolean = false;

    public constructor(transcribeItem: TranscribeItem) {
        this.transcribeItem = transcribeItem;

        const transcript = transcribeItem.alternatives.length > 0 ? transcribeItem.alternatives.map(x => x.transcript).join('') : '';
        this.transcript = transcribeItem.userTranscript === null ? transcript : transcribeItem.userTranscript;
        const startTime = new TimeSpanWrapper(transcribeItem.startTimeTicks).getTime();
        const endTime = new TimeSpanWrapper(transcribeItem.endTimeTicks).getTime();

        this.id = transcribeItem.id;
        this.userTranscript = this.transcript;
        this.time = `${startTime} - ${endTime}`;
        this.isIncomplete = transcribeItem.isIncomplete;
        this.wasCleaned = transcribeItem.wasCleaned;
        this.confidence = this.calculateAverageConfidence(transcribeItem.alternatives);
    }

    private calculateAverageConfidence(alternatives: RecognitionAlternative[]): number {
        if (alternatives.length <= 0)
            return 0;

        let map = alternatives.map(x => x.confidence);
        let total = map.reduce((previousValue, currentValue) => previousValue + currentValue);
        return total / map.length;
    }

    public get isUserTranscriptChanged() {
        return this.transcript !== this.userTranscript;
    }

    public refreshTranscript() {
        this.isDirty = false;
        this.userTranscript = this.transcript;
    }

}