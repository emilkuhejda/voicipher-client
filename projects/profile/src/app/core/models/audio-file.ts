export interface AudioFile {
    id: string;
    name: string;
    fileName: string;
    language: string;
    isPhoneCall: string;
    recognitionStateString: string;
    uploadStatus: string;
    totalTimeTicks: number;
    transcriptionStartTimeTicks: number;
    transcriptionEndTimeTicks: number;
    transcribedTimeTicks: number;
    dateCreated: Date;
    dateProcessedUtc: Date;
    dateUpdatedUtc: Date;
    isDeleted: boolean;
}