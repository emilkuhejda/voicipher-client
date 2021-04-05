import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageState } from '../app.state';

const getMessageFeatureState = createFeatureSelector<MessageState>('message');

export const getMessages = createSelector(
    getMessageFeatureState,
    state => state.messages
);

export const getActiveMessagesCount = createSelector(
    getMessageFeatureState,
    state => state.messages.filter(x => !x.wasOpened).length
);

export const getMessageBoxMessages = createSelector(
    getMessageFeatureState,
    state => state.messages.slice(0, 5)
);

export const getCurrentMessage = createSelector(
    getMessageFeatureState,
    state => state.currentMessage
);

export const getMessageModuleError = createSelector(
    getMessageFeatureState,
    state => state.error
);
