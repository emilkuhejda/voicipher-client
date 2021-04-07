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
    remainingTime: '',
    error: '',
    loginError: false,
};

export const accountReducer = createReducer<AccountState>(
    initialState,
    on(AccountApiAction.registerUserSuccess, (state, action): AccountState => ({
        ...state,
        identity: { ...action.identity }
    })),
    on(AccountApiAction.registerUserFailure, (state): AccountState => ({
        ...state,
        loginError: true
    })),
    on(AccountApiAction.updateUserDataSuccess, (state, action): AccountState => ({
        ...state,
        identity: { ...action.identity },
        error: ''
    })),
    on(AccountApiAction.updateUserDataFailure, (state, action): AccountState => ({
        ...state,
        error: action.error
    })),
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
    })),
    on(AccountApiAction.loadRemainingTimeSuccess, (state, action): AccountState => ({
        ...state,
        remainingTime: action.remainingTime
    })),
    on(AccountApiAction.loadRemainingTimeFailure, (state, action): AccountState => ({
        ...state,
        error: action.error
    }))
);
