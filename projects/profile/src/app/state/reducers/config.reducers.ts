import { createReducer, on } from '@ngrx/store';
import { environment } from '@profile/environment';
import { ConfigApiActions } from '@profile/state/actions';
import { ConfigState } from '@profile/state/app.state';

const initialState: ConfigState = {
    currentLanguage: environment.defaultLanguage,
    languages: environment.languages
};

export const configReducer = createReducer<ConfigState>(
    initialState,
    on(ConfigApiActions.setCurrentLanguageSuccess, (state, action): ConfigState => ({
        ...state,
        currentLanguage: action.language
    }))
);
