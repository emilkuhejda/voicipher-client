import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { InformationMessageService } from '@profile/service/information-message.service';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { MessageApiAction, MessagePageAction } from '../actions';

@Injectable()
export class MessageEffects {

    public constructor(
        private action$: Actions,
        private informationMessageService: InformationMessageService,
        private translateService: TranslateService) { }

    public loadMessages$ = createEffect(() => this.action$
        .pipe(
            ofType(MessagePageAction.loadMessagesRequest),
            mergeMap(() => this.informationMessageService.getAll()
                .pipe(
                    map(messages => MessageApiAction.loadMessagesSuccess({ messages: messages })),
                    catchError(() => this.translateService
                        .get('ErrorMessage')
                        .pipe(map(translation => MessageApiAction.loadMessagesFailure({ error: translation }))))
                ))
        ));

    public loadCurrentMessage$ = createEffect(() => this.action$
        .pipe(
            ofType(MessagePageAction.loadCurrentMessageRequest),
            concatMap(action => this.informationMessageService.get(action.messageId)
                .pipe(
                    map(message => MessageApiAction.loadCurrentMessageSuccess({ message })),
                    catchError(() => this.translateService
                        .get('ErrorMessage')
                        .pipe(map(translation => MessageApiAction.loadCurrentMessageFailure({ error: translation }))))
                ))
        ));
}