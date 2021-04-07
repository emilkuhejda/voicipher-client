import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Identity } from '@profile/core/models';
import { StorageService } from '@profile/service/storage.service';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AccountApiAction, AccountPageAction } from '../actions';

@Injectable()
export class AccountEffects {

    public constructor(private action$: Actions, private storageService: StorageService) { }

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

}
