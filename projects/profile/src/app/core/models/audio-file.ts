import { RecognitionState } from '../types/recognition-state';
import { UploadStatus } from '../types/upload-status';

export interface AudioFile {
    id: string;
    name: string;
    fileName: string;
    language: string;
    isPhoneCall: boolean;
    recognitionStateString: RecognitionState;
    uploadStatus: UploadStatus;
    totalTimeTicks: number;
    transcriptionStartTimeTicks: number;
    transcriptionEndTimeTicks: number;
    transcribedTimeTicks: number;
    dateCreated: Date;
    dateProcessedUtc: Date | null;
    dateUpdatedUtc: Date;
    isDeleted: boolean;
}
