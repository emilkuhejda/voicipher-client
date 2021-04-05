import { RecognitionAlternative } from './recognition-alternative';

export interface TranscribeItem {
    id: string;
    fileItemId: string;
    alternatives: RecognitionAlternative[];
    transcript: string;
    userTranscript: string;
    startTimeString: string;
    endTimeString: string;
    totalTimeString: string;
    isIncomplete: boolean;
    dateCreated: Date;
    dateUpdated: Date;
    wasCleaned: boolean;
}
