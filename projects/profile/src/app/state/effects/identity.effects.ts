import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Identity } from '@profile/core/models';
import { StorageService } from '@profile/service/storage.service';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { IdentityApiAction, IdentityPageAction } from '../actions';

@Injectable()
export class IdentityEffects {

    public constructor(private action$: Actions, private storageService: StorageService) { }

    public createIdentity = createEffect(() => this.action$
        .pipe(
            ofType(IdentityPageAction.setCurrentIdentityRequest),
            concatMap(action => {
                this.storageService.setItem('identity', action.identity);
                return of(IdentityApiAction.setCurrentIdentitySuccess({ identity: action.identity }));
            })
        ));

    public loadIdentity = createEffect(() => this.action$
        .pipe(
            ofType(IdentityPageAction.loadCurrentIdentityRequest),
            concatMap(() => {
                const identity = this.storageService.getItem<Identity>('identity');
                if (identity) {
                    return of(IdentityApiAction.loadCurrentIdentitySuccess({ identity: identity }));
                } else {
                    return of(IdentityApiAction.loadCurrentIdentityFailure());
                }
            })
        ));

}