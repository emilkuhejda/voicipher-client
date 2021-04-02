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

    public loadIdentity = createEffect(() => this.action$
        .pipe(
            ofType(IdentityPageAction.loadCurrentIdentityRequest),
            concatMap(() => {
                const identity = this.storageService.getItem<Identity>('identity');
                return of(IdentityApiAction.loadCurrentIdentitySuccess({ identity: identity! }));
            })
        ))

}