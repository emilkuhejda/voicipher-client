import * as Msal from 'msal';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { environment } from '@profile/environment';

@Injectable()
export class MsalService {

    private clientApplication: Msal.UserAgentApplication;

    public constructor(private storageService: StorageService) {
        const tenantConfig = environment.tenantConfig;
        const authority = `${tenantConfig.authorityBase}${tenantConfig.tenant}/${tenantConfig.signUpSignIn}`;
        this.clientApplication = new Msal.UserAgentApplication(
            environment.tenantConfig.clientId,
            authority,
            (errorDesc: any, token: any) => {
                if (errorDesc !== undefined || token === undefined) {
                    this.logout();
                    return;
                }

                storageService.setItem('b2c.token', token);
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

    public logout(): void {
        this.clientApplication.logout();
        this.storageService.clear();
    }

    public completeLogin(token: string): void {
        this.storageService.setItem('token', token);
        this.storageService.removeItem('b2c.token');
    }

    public isLoggedIn(): boolean {
        return this.storageService.getItem('token') !== null;
    }

    public hasB2CToken(): boolean {
        return this.storageService.getItem('b2c.token') !== null;
    }

    public getUserId(): string {
        return this.getUser().oid;
    }

    public getEmail(): string {
        return this.getUser().emails[0];
    }

    public getGivenName(): string {
        return this.decode(this.getUser().given_name);
    }

    public getFamilyName(): string {
        return this.decode(this.getUser().family_name);
    }

    public getToken(): string | null {
        return this.storageService.getItem('token');
    }

    public getB2CToken(): string | null {
        return this.storageService.getItem('b2c.token');
    }

    private getUser(): any {
        return this.clientApplication.getUser().idToken;
    }

    private decode(text: string): string {
        return decodeURIComponent(escape(text));
    }
}
