import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UploadedFile } from '@profile/core/models/uploaded-file';
import { FileState } from '../app.state';

const getFileFeatureState = createFeatureSelector<FileState>('file');

export const getAudioFiles = createSelector(
    getFileFeatureState,
    state => state.audioFiles
);

export const getUploadedFiles = createSelector(
    getFileFeatureState,
    state => state.audioFiles
);

export const getCurrentUploadedFile = createSelector(
    getFileFeatureState,
    state => state.currentUploadedFile
);

export const getCurrentUploadedFileProgress = createSelector(
    getFileFeatureState,
    getCurrentUploadedFile,
    (state: FileState, currentUploadedFile: UploadedFile | undefined) =>
        state.uploadedFiles.find(x => x.identifier === currentUploadedFile?.identifier)?.progress ?? 0
);

export const getFileModuleError = createSelector(
    getFileFeatureState,
    state => state.error
);
