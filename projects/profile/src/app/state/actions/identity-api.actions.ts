import { createAction, props } from '@ngrx/store';
import { Identity } from '@profile/core/models';

export const setCurrentIdentitySuccess = createAction(
    '[Identity API] Set current identity success',
    props<{ identity: Identity }>()
);

export const loadCurrentIdentitySuccess = createAction(
    '[Identity API] Load current identity success',
    props<{ identity: Identity }>()
);

export const loadCurrentIdentityFailure = createAction(
    '[Identity API] Load current identity Failure'
);
