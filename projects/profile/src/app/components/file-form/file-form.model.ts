export interface FileFormModel {
    id: string;
    name: string;
    fileName: string | undefined;
    language: string;
    audioType: string;
    transcriptionStartTime: string;
    transcriptionEndTime: string;
}
