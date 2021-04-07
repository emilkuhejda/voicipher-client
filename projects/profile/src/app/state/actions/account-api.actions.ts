import { createAction, props } from '@ngrx/store';
import { Identity } from '@profile/core/models';

export const setCurrentIdentitySuccess = createAction(
    '[Account API] Set current identity success',
    props<{ identity: Identity }>()
);

export const loadCurrentIdentitySuccess = createAction(
    '[Account API] Load current identity success',
    props<{ identity: Identity }>()
);

export const loadCurrentIdentityFailure = createAction(
    '[Account API] Load current identity Failure'
);

export const loadRemainingTimeSuccess = createAction(
    '[Account Page] Load remaining time success',
    props<{ remainingTime: string }>()
);

export const loadRemainingTimeFailure = createAction(
    '[Account Page] Load remaining time Failure',
    props<{ error: string }>()
);
