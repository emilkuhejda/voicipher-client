import { createAction, props } from '@ngrx/store';
import { Identity } from '@profile/core/models';

export const loadCurrentIdentitySuccess = createAction(
    '[Identity API] Load current identity success',
    props<{ identity: Identity }>()
);
