import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigState } from '@profile/state/app.state';

const getConfigFeatureState = createFeatureSelector<ConfigState>('config');

export const getCurrentLanguage = createSelector(
    getConfigFeatureState,
    state => state.currentLanguage
);

export const getLanguages = createSelector(
    getConfigFeatureState,
    state => state.languages
);
