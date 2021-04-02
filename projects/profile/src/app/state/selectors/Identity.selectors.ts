import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IdentityState } from '../app.state';

const getConfigFeatureState = createFeatureSelector<IdentityState>('identity');

export const getCurrentIdentity = createSelector(
    getConfigFeatureState,
    state => state.identity
);
