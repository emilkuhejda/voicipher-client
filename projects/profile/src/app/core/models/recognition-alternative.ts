import { RecognitionWordInfo } from './recognition-word-info';

export interface RecognitionAlternative {
    transcript: string;
    confidence: number;
    words: RecognitionWordInfo[];
}
