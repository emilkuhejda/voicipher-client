import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState } from '../app.state';

const getAccountFeatureState = createFeatureSelector<AccountState>('account');

export const getCurrentIdentity = createSelector(
    getAccountFeatureState,
    state => state.identity
);

export const getRemainingTime = createSelector(
    getAccountFeatureState,
    state => state.remainingTime
);

export const getAccountModuleError = createSelector(
    getAccountFeatureState,
    state => state.error
);
