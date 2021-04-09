import { createAction, props } from '@ngrx/store';
import { Identity } from '@profile/core/models';
import { UserRegistrationInputModel, UpdateUserInputModel } from '@profile/core/models/input-models';

export const registerUserRequest = createAction(
    '[Account Page] Register user request',
    props<{ userRegistrationModel: UserRegistrationInputModel }>()
);

export const updateUserDataRequest = createAction(
    '[Account Page] Update user data request',
    props<{ updateUserInputModel: UpdateUserInputModel }>()
);

export const setCurrentIdentityRequest = createAction(
    '[Account Page] Set current identity request',
    props<{ identity: Identity }>()
);

export const loadCurrentIdentityRequest = createAction(
    '[Account Page] Load current identity request'
);

export const removeCurrentIdentityRequest = createAction(
    '[Account Page] Remove current identity request'
);

export const loadRemainingTimeRequest = createAction(
    '[Account Page] Load remaining time request'
);
