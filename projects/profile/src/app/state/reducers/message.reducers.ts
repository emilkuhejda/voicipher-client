import { createReducer, on } from '@ngrx/store';
import { MessageApiAction, MessagePageAction } from '../actions';
import { MessageState } from '../app.state';

const initialState: MessageState = {
    currentMessage: undefined,
    messages: [],
    error: ''
};

export const messageReducer = createReducer<MessageState>(
    initialState,
    on(MessagePageAction.loadMessagesRequest, (state): MessageState => ({
        ...state,
        error: ''
    })),
    on(MessageApiAction.loadMessagesSuccess, (state, action): MessageState => ({
        ...state,
        messages: action.messages.slice().sort((a, b) => b.datePublishedUtc.getTime() - a.datePublishedUtc.getTime()),
        error: ''
    })),
    on(MessageApiAction.loadMessagesFailure, (state, action): MessageState => ({
        ...state,
        error: action.error
    })),
    on(MessagePageAction.loadCurrentMessageRequest, (state): MessageState => ({
        ...state,
        error: ''
    })),
    on(MessageApiAction.loadCurrentMessageSuccess, (state, action): MessageState => ({
        ...state,
        currentMessage: action.message,
        error: ''
    })),
    on(MessageApiAction.loadCurrentMessageFailure, (state, action): MessageState => ({
        ...state,
        error: action.error
    })),
    on(MessageApiAction.markMessageAsOpenedSuccess, (state, action): MessageState => {
        const updatedMessages = state.messages.map(item => item.id === action.message.id ? action.message : item);
        return {
            ...state,
            messages: updatedMessages.slice().sort((a, b) => b.datePublishedUtc.getTime() - a.datePublishedUtc.getTime()),
            error: ''
        };
    })
);
