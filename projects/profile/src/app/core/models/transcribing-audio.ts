import { RecognitionState } from "../types/recognition-state";

export interface TranscribingAudio {
    fileItemId: string;
    recognitionState: RecognitionState;
    percentageDone: number;
}
