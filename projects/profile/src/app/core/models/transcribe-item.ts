import { RecognitionAlternative } from './recognition-alternative';

export interface TranscribeItem {
    id: string;
    fileItemId: string;
    alternatives: RecognitionAlternative[];
    transcript: string;
    userTranscript: string;
    startTimeTicks: number;
    endTimeTicks: number;
    totalTimeTicks: number;
    isIncomplete: boolean;
    dateCreated: Date;
    dateUpdated: Date;
    wasCleaned: boolean;
}
