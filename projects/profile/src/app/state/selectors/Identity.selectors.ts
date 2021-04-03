import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IdentityState } from '../app.state';

const getIdentityFeatureState = createFeatureSelector<IdentityState>('identity');

export const getCurrentIdentity = createSelector(
    getIdentityFeatureState,
    state => state.identity
);
