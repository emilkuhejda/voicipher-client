import { createReducer, on } from '@ngrx/store';
import { Identity } from '@profile/core/models';
import { AccountApiAction, AccountPageAction } from '../actions';
import { AccountState } from '../app.state';

const emptyIdentity: Identity = {
    id: '',
    email: '',
    givenName: '',
    familyName: ''
};

const initialState: AccountState = {
    identity: emptyIdentity,
    remainingTime: ''
};

export const accountReducer = createReducer<AccountState>(
    initialState,
    on(AccountApiAction.setCurrentIdentitySuccess, (state, action): AccountState => ({
        ...state,
        identity: { ...action.identity }
    })),
    on(AccountApiAction.loadCurrentIdentitySuccess, (state, action): AccountState => ({
        ...state,
        identity: { ...action.identity }
    })),
    on(AccountApiAction.loadCurrentIdentityFailure, (): AccountState => ({
        ...initialState
    })),
    on(AccountPageAction.removeCurrentIdentityRequest, (): AccountState => ({
        ...initialState
    }))
);
