import { Component, OnInit } from '@angular/core';
import { StorageService } from '@profile/service/storage.service';
import { UserRegistrationInputModel } from '@profile/core/models/input-models';
import { environment } from '@profile/environment';
import { MsalService } from '@profile/service/msal.service';
import { UserService } from '@profile/service/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.sass']
})
export class RegisterUserComponent implements OnInit {

    public constructor(
        private userService: UserService,
        private storageService: StorageService,
        private router: Router,
        private msalService: MsalService) { }

    public ngOnInit(): void {
        const userRegistrationModel: UserRegistrationInputModel = {
            id: this.msalService.getUserId(),
            applicationId: environment.applicationId,
            email: this.msalService.getUserEmail(),
            givenName: this.msalService.getGivenName(),
            familyName: this.msalService.getFamilyName()
        };

        this.userService
            .registerUser(userRegistrationModel)
            .subscribe(
                userRegistration => {
                    this.storageService.setItem('identity', userRegistration.identity);
                    this.msalService.completeLogin(userRegistration.token);
                    this.router.navigate(['/']);
                },
                () => this.msalService.logout());
    }

}
