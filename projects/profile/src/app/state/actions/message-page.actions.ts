import { createAction, props } from '@ngrx/store';
import { InformationMessage } from '@profile/core/models/information-message';

export const loadMessagesRequest = createAction(
    '[Message Page] Load messages request'
);

export const loadCurrentMessageRequest = createAction(
    '[Message Page] Load current message request',
    props<{ messageId: string }>()
);

export const markMessageAsOpenedRequest = createAction(
    '[Message Page] Mark message as opened request',
    props<{ message: InformationMessage }>()
);
