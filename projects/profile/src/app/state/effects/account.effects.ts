import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Identity } from '@profile/core/models';
import { AccountService } from '@profile/service/account.service';
import { StorageService } from '@profile/service/storage.service';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { AccountApiAction, AccountPageAction } from '../actions';

@Injectable()
export class AccountEffects {

    public constructor(
        private action$: Actions,
        private accountService: AccountService,
        private storageService: StorageService,
        private translateService: TranslateService) { }

    public createIdentity$ = createEffect(() => this.action$
        .pipe(
            ofType(AccountPageAction.setCurrentIdentityRequest),
            concatMap(action => {
                this.storageService.setItem('identity', action.identity);
                return of(AccountApiAction.setCurrentIdentitySuccess({ identity: action.identity }));
            })
        ));

    public loadIdentity$ = createEffect(() => this.action$
        .pipe(
            ofType(AccountPageAction.loadCurrentIdentityRequest),
            concatMap(() => {
                const identity = this.storageService.getItem<Identity>('identity');
                if (identity) {
                    return of(AccountApiAction.loadCurrentIdentitySuccess({ identity }));
                } else {
                    return of(AccountApiAction.loadCurrentIdentityFailure());
                }
            })
        ));

    public loadRemainingTime$ = createEffect(() => this.action$
        .pipe(
            ofType(AccountPageAction.loadRemainingTimeRequest),
            concatMap(() => this.accountService.getSubscriptionRemainingTime()
                .pipe(
                    map(timeSpan => AccountApiAction.loadRemainingTimeSuccess({ remainingTime: timeSpan.getTime() })),
                    catchError(() => this.translateService
                        .get('ErrorMessage')
                        .pipe(map(translation => AccountApiAction.loadRemainingTimeFailure({ error: translation }))))
                ))
        ));

}
