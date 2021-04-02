import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { MsalService } from '@profile/service/msal.service';

@Injectable({
    providedIn: 'root'
})
export class MsalGuard implements CanActivate {

    public constructor(private msalService: MsalService) { }

    public canActivate(): boolean {
        if (!this.msalService.hasB2CToken()) {
            this.msalService.login();
            return false;
        }

        return true;
    }

}
