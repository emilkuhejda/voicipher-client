import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FileState } from '../app.state';

const getFileFeatureState = createFeatureSelector<FileState>('file');

export const getCurrentAudioFile = createSelector(
    getFileFeatureState,
    state => state.currentAudioFile
);

export const getCurrentBlobAudioSource = createSelector(
    getFileFeatureState,
    state => state.currentAudioBlobSource
);

export const getCurrentTranscribeItems = createSelector(
    getFileFeatureState,
    state => state.currentTranscribeItems
);

export const getAudioFiles = createSelector(
    getFileFeatureState,
    state => state.audioFiles
);

export const getUploadedFiles = createSelector(
    getFileFeatureState,
    state => state.uploadedFiles
);

export const getCurrentUploadedFileProgress = createSelector(
    getFileFeatureState,
    state => state.currentUploadProgress
);

export const getCurrentFileIdentifier = createSelector(
    getFileFeatureState,
    state => state.currentFileIdentifier
);

export const getFileModuleSuccessMessage = createSelector(
    getFileFeatureState,
    state => state.successMessage
);

export const getFileModuleError = createSelector(
    getFileFeatureState,
    state => state.error
);
