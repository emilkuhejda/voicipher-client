export interface TranscribeModel {
    audioFileId: string;
    name: string;
    language: string;
    isPhoneCall: boolean;
    isTimeFrame: boolean;
    startTime: number;
    endTime: number;
}
