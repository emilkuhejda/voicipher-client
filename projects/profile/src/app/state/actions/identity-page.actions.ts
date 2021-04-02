import { createAction, props } from '@ngrx/store';
import { Identity } from '@profile/core/models';

export const setCurrentIdentityRequest = createAction(
    '[Identity Page] Set current identity request',
    props<{ identity: Identity }>()
);

export const loadCurrentIdentityRequest = createAction(
    '[Identity Page] Load current identity request'
);

export const removeCurrentIdentityRequest = createAction(
    '[Identity Page] Remove current identity request'
);
