import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageState } from '../app.state';

const getFileFeatureState = createFeatureSelector<MessageState>('message');

export const getMessages = createSelector(
    getFileFeatureState,
    state => state.messages
);

export const getCurrentMessage = createSelector(
    getFileFeatureState,
    state => state.currentMessage
);

export const getMessageModuleError = createSelector(
    getFileFeatureState,
    state => state.error
);
