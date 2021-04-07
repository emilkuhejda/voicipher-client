import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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

    public constructor(private store: Store<AppState>) { }

    public ngOnInit(): void {
        this.remainingTime$ = this.store.select(getRemainingTime);
    }

    public editProfile(): void { }

    public resetPassword(): void { }

}
