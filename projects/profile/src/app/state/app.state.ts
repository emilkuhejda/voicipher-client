import { ActionReducerMap } from '@ngrx/store';
import { Identity } from '@profile/core/models';
import { AudioFile } from '@profile/core/models/audio-file';
import { UploadedFile } from '@profile/core/models/uploaded-file';
import { fileReducer } from './reducers/audio-file.reducers';
import { configReducer } from './reducers/config.reducers';
import { identityReducer } from './reducers/Identity.reducers';

export interface AppState {
    file: FileState;
    identity: IdentityState;
    config: ConfigState;
}

export interface FileState {
    currentUploadProgress: number;
    currentFileIdentifier: string;
    uploadedFiles: UploadedFile[];
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
    identity: identityReducer,
    config: configReducer
};
