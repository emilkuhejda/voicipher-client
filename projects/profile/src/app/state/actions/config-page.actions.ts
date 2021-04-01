import { createAction, props } from '@ngrx/store';

export const setCurrentLanguageRequest = createAction(
    '[Config Page] Set current language request',
    props<{ language: string }>()
);
