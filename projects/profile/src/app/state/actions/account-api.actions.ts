import { createAction, props } from '@ngrx/store';
import { Identity } from '@profile/core/models';

export const registerUserSuccess = createAction(
    '[Account API] Register user success',
    props<{ identity: Identity }>()
);

export const registerUserFailure = createAction(
    '[Account API] Register user failure'
);

export const updateUserDataSuccess = createAction(
    '[Account API] Update user data success',
    props<{ identity: Identity }>()
);

export const updateUserDataFailure = createAction(
    '[Account API] Update user data failure',
    props<{ error: string }>()
);

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
    '[Account API] Load remaining time success',
    props<{ remainingTime: string }>()
);

export const loadRemainingTimeFailure = createAction(
    '[Account API] Load remaining time Failure',
    props<{ error: string }>()
);
