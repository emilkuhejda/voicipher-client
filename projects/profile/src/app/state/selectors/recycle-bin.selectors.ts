import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecycleBinState } from '../app.state';

const getFileFeatureState = createFeatureSelector<RecycleBinState>('recycleBin');

export const getRecycleBinAudioFiles = createSelector(
    getFileFeatureState,
    state => state.audioFiles
);
