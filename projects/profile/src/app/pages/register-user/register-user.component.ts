import { Component, OnInit } from '@angular/core';
import { UserRegistrationInputModel } from '@profile/core/models/input-models';
import { environment } from '@profile/environment';
import { MsalService } from '@profile/service/msal.service';
import { UserService } from '@profile/service/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@profile/state/app.state';
import { AccountPageAction } from '@profile/state/actions';

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

    public constructor(
        private store: Store<AppState>,
        private userService: UserService,
        private router: Router,
        private msalService: MsalService) { }

    public ngOnInit(): void {
        const userRegistrationModel: UserRegistrationInputModel = {
            id: this.msalService.getUserId(),
            applicationId: environment.applicationId,
            email: this.msalService.getEmail(),
            givenName: this.msalService.getGivenName(),
            familyName: this.msalService.getFamilyName()
        };

        this.userService
            .registerUser(userRegistrationModel)
            .subscribe(
                userRegistration => {
                    this.msalService.completeLogin(userRegistration.token);
                    this.store.dispatch(AccountPageAction.setCurrentIdentityRequest({ identity: userRegistration.identity }));
                    this.router.navigate(['/']);
                },
                () => this.msalService.logout());
    }

}
