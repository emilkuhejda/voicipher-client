import { ActionReducerMap } from '@ngrx/store';
import { Identity } from '@profile/core/models';
import { AudioFile } from '@profile/core/models/audio-file';
import { InformationMessage } from '@profile/core/models/information-message';
import { TranscribeItem } from '@profile/core/models/transcribe-item';
import { UploadedFile } from '@profile/core/models/uploaded-file';
import { fileReducer } from './reducers/audio-file.reducers';
import { configReducer } from './reducers/config.reducers';
import { accountReducer } from './reducers/account.reducers';
import { messageReducer } from './reducers/message.reducers';
import { recycleBinReducer } from './reducers/recycle-bin.reducers';

interface BlobSource {
    transcribeItemId: string;
    blob: Blob | undefined;
}

export interface AppState {
    file: FileState;
    message: MessageState;
    recycleBin: RecycleBinState;
    account: AccountState;
    config: ConfigState;
}

export interface FileState {
    currentUploadProgress: number;
    currentFileIdentifier: string;
    uploadedFiles: UploadedFile[];
    currentAudioFile: AudioFile | undefined;
    currentAudioBlobSource: BlobSource;
    currentTranscribeItems: TranscribeItem[];
    audioFiles: AudioFile[];
    successMessage: string;
    error: string;
}

export interface MessageState {
    currentMessage: InformationMessage | undefined;
    messages: InformationMessage[];
    error: string;
}

export interface RecycleBinState {
    audioFiles: AudioFile[];
    successMessage: string;
    error: string;
}

export interface AccountState {
    identity: Identity;
    remainingTime: string;
    error: string;
    loginError: boolean;
}

export interface ConfigState {
    currentLanguage: string;
    languages: string[];
};

export const reducers: ActionReducerMap<AppState> = {
    file: fileReducer,
    message: messageReducer,
    recycleBin: recycleBinReducer,
    account: accountReducer,
    config: configReducer
};
