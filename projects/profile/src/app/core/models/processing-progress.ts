import { RecognitionState } from '../types/recognition-state';

export interface ProcessingProgress {
    fileItemId: string;
    recognitionState: RecognitionState;
    percentageDone: number;
}
