import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState } from '../app.state';

const getAccountFeatureState = createFeatureSelector<AccountState>('identity');

export const getCurrentIdentity = createSelector(
    getAccountFeatureState,
    state => state.identity
);
