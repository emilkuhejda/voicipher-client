import { ActionReducerMap } from '@ngrx/store';
import { Identity } from '@profile/core/models';
import { AudioFile } from '@profile/core/models/audio-file';
import { UploadedFile } from '@profile/core/models/uploaded-file';
import { fileReducer } from './reducers/audio-file.reducers';
import { configReducer } from './reducers/config.reducers';
import { identityReducer } from './reducers/Identity.reducers';
import { recycleBinReducer } from './reducers/recycle-bin.reducers';

export interface AppState {
    file: FileState;
    recycleBin: RecycleBinState;
    identity: IdentityState;
    config: ConfigState;
}

export interface FileState {
    currentUploadProgress: number;
    currentFileIdentifier: string;
    uploadedFiles: UploadedFile[];
    currentAudioFile: AudioFile | undefined;
    audioFiles: AudioFile[];
    successMessage: string;
    error: string;
}

export interface RecycleBinState {
    audioFiles: AudioFile[];
    successMessage: string;
    error: string;
}

export interface IdentityState {
    identity: Identity;
}

export interface ConfigState {
    currentLanguage: string;
    languages: string[];
};

export const reducers: ActionReducerMap<AppState> = {
    file: fileReducer,
    recycleBin: recycleBinReducer,
    identity: identityReducer,
    config: configReducer
};
