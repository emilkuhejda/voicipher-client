import { createAction, props } from "@ngrx/store";

export const loadMessagesRequest = createAction(
    '[Message Page] Load messages request'
);

export const loadCurrentMessageRequest = createAction(
    '[Message Page] Load current message request',
    props<{ messageId: string }>()
);
