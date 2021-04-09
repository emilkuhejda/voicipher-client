import { createAction, props } from '@ngrx/store';
import { InformationMessage } from '@profile/core/models';

export const loadMessagesSuccess = createAction(
    '[Message API] Load messages success',
    props<{ messages: InformationMessage[] }>()
);

export const loadMessagesFailure = createAction(
    '[Message API] Load messages failure',
    props<{ error: string }>()
);

export const loadCurrentMessageSuccess = createAction(
    '[Message API] Load current message success',
    props<{ message: InformationMessage }>()
);

export const loadCurrentMessageFailure = createAction(
    '[Message API] Load current message failure',
    props<{ error: string }>()
);

export const markMessageAsOpenedSuccess = createAction(
    '[Message API] Mark message as opened success',
    props<{ message: InformationMessage }>()
);

export const markMessageAsOpenedFailure = createAction(
    '[Message API] Mark message as opened failure',
    props<{ error: string }>()
);
