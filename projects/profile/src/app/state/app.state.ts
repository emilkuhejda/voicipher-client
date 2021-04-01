import { ActionReducerMap } from '@ngrx/store';
import { configReducer } from './reducers/config.reducers';

export interface AppState {
    config: ConfigState;
}

export interface ConfigState {
    currentLanguage: string;
    languages: string[];
};

export const reducers: ActionReducerMap<AppState> = {
    config: configReducer
};
