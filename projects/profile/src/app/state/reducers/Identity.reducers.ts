import { createReducer, on } from '@ngrx/store';
import { Identity } from '@profile/core/models';
import { IdentityApiAction, IdentityPageAction } from '../actions';
import { IdentityState } from '../app.state';

const emptyIdentity: Identity = {
    id: '',
    email: '',
    givenName: '',
    familyName: ''
}

const initialState: IdentityState = {
    identity: emptyIdentity
};

export const identityReducer = createReducer<IdentityState>(
    initialState,
    on(IdentityApiAction.loadCurrentIdentitySuccess, (state, action): IdentityState => ({
        ...state,
        identity: { ...action.identity }
    })),
    on(IdentityPageAction.removeCurrentIdentityRequest, (state): IdentityState => ({
        ...initialState
    }))
);
