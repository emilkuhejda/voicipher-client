import { ActionReducerMap } from '@ngrx/store';
import { Identity } from '@profile/core/models';
import { configReducer } from './reducers/config.reducers';
import { identityReducer } from './reducers/Identity.reducers';

export interface AppState {
    identity: IdentityState,
    config: ConfigState;
}

export interface ConfigState {
    currentLanguage: string;
    languages: string[];
};

export interface IdentityState {
    identity: Identity
}

export const reducers: ActionReducerMap<AppState> = {
    identity: identityReducer,
    config: configReducer,
};
