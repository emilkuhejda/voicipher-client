import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecycleBinState } from '../app.state';

const getFileFeatureState = createFeatureSelector<RecycleBinState>('recycleBin');

export const getRecycleBinAudioFiles = createSelector(
    getFileFeatureState,
    state => state.audioFiles
);

export const getRecycleBinModuleSuccessMessage = createSelector(
    getFileFeatureState,
    state => state.successMessage
);

export const getRecycleBinModuleError = createSelector(
    getFileFeatureState,
    state => state.error
);
