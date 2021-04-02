import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FileState } from '../app.state';

const getFileFeatureState = createFeatureSelector<FileState>('file');

export const getAudioFiles = createSelector(
    getFileFeatureState,
    state => state.audioFiles
);
