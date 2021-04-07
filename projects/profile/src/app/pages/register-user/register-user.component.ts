import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserRegistrationInputModel } from '@profile/core/models/input-models';
import { environment } from '@profile/environment';
import { MsalService } from '@profile/service/msal.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@profile/state/app.state';
import { AccountPageAction } from '@profile/state/actions';
import { getCurrentIdentity, getLoginError } from '@profile/state/selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public constructor(
        private store: Store<AppState>,
        private router: Router,
        private msalService: MsalService) { }

    public ngOnInit(): void {
        this.store.select(getCurrentIdentity)
            .pipe(takeUntil(this.destroy$))
            .subscribe(identity => {
                if (identity.id !== '') {
                    this.router.navigate(['/']);
                }
            });

        this.store.select(getLoginError)
            .pipe(takeUntil(this.destroy$))
            .subscribe(loginError => {
                if (loginError) {
                    this.msalService.logout();
                }
            });

        const userRegistrationModel: UserRegistrationInputModel = {
            id: this.msalService.getUserId(),
            applicationId: environment.applicationId,
            email: this.msalService.getEmail(),
            givenName: this.msalService.getGivenName(),
            familyName: this.msalService.getFamilyName()
        };

        this.store.dispatch(AccountPageAction.registerUserRequest({ userRegistrationModel }));
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

}
