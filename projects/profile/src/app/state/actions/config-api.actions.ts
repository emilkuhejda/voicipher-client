import { createAction, props } from '@ngrx/store';

export const setCurrentLanguageSuccess = createAction(
    '[Config API] Set current language success',
    props<{ language: string }>()
);
