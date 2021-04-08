import { RecognitionState } from "../types/recognition-state";

export interface CacheItem {
    fileItemId: string;
    recognitionState: RecognitionState;
    percentageDone: number;
}
