import * as Msal from 'msal';
import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { environment } from '@profile/environment';

@Injectable()
export class MsalService {

    private authority = environment.tenantConfig.authorityBase + environment.tenantConfig.tenant + "/" + environment.tenantConfig.signUpSignIn;

    private clientApplication: Msal.UserAgentApplication;

    constructor(private storageService: StorageService) {
        this.clientApplication = new Msal.UserAgentApplication(
            environment.tenantConfig.clientId,
            this.authority,
            function (errorDesc: any, token: any) {
                if (errorDesc !== undefined) {
                    return;
                }

                if (token === undefined) {
                    return;
                }

                storageService.setToken(token);
                console.log(token);
            },
            {
                cacheLocation: environment.tenantConfig.cacheLocation,
                redirectUri: environment.tenantConfig.redirectUri,
                navigateToLoginRequestUrl: false
            }
        );
    }

    public login(): void {
        this.clientApplication.loginRedirect(environment.tenantConfig.b2cScopes);
    }

    logout(): void {
        this.clientApplication.logout();
        this.storageService.removeToken();
    }

    isLoggedIn(): boolean {
        return this.storageService.getToken() !== null;
    };
}
