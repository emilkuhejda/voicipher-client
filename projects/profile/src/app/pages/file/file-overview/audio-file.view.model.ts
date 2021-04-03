import { AudioFile } from '@profile/core/models/audio-file';

export class AudioFileViewModel {
    private audioFile: AudioFile;

    public id: string;
    public name: string;
    public dateCreated: Date;
    public status: string;

    public constructor(audioFile: AudioFile) {
        this.audioFile = audioFile;

        this.id = audioFile.id;
        this.name = audioFile.name;
        this.dateCreated = audioFile.dateCreated;
        this.status = audioFile.recognitionStateString;
    }

    public get canTranscribe(): boolean {
        return this.audioFile.recognitionStateString === 'None';
    }

    public get isInProgress(): boolean {
        return this.audioFile.recognitionStateString == 'InProgress';
    }

    public get isCompleted(): boolean {
        return this.audioFile.recognitionStateString === 'Completed';
    }

}