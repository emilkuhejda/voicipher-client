import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MsalService } from '@profile/service/msal.service';
import { AccountPageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getRemainingTime } from '@profile/state/selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    public remainingTime$: Observable<string> | undefined;

    public constructor(
        private store: Store<AppState>,
        private msalService: MsalService) { }

    public ngOnInit(): void {
        this.store.dispatch(AccountPageAction.loadRemainingTimeRequest());
        this.remainingTime$ = this.store.select(getRemainingTime);
    }

    public editProfile(): void {
        this.msalService.editProfile();
    }

    public resetPassword(): void {
        this.msalService.resetPassword();
    }

}
