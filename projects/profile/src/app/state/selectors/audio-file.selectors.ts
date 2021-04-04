import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FileState } from '../app.state';

const getFileFeatureState = createFeatureSelector<FileState>('file');

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

export const getFileModuleError = createSelector(
    getFileFeatureState,
    state => state.error
);
