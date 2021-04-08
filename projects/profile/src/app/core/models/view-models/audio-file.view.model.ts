import { AudioFile } from '../audio-file';

export class AudioFileViewModel {
    public audioFile: AudioFile;

    public id: string;
    public name: string;
    public dateCreated: Date;
    public status: string;
    public percentageDone: number;

    public constructor(audioFile: AudioFile, percentageDone: number) {
        this.audioFile = audioFile;

        this.id = audioFile.id;
        this.name = audioFile.name;
        this.dateCreated = audioFile.dateCreated;
        this.status = audioFile.recognitionStateString;
        this.percentageDone = percentageDone;
    }

    public get canTranscribe(): boolean {
        return this.audioFile.recognitionStateString === 'None';
    }

    public get isInProgress(): boolean {
        return this.audioFile.recognitionStateString === 'InProgress';
    }

    public get isCompleted(): boolean {
        return this.audioFile.recognitionStateString === 'Completed';
    }

}
