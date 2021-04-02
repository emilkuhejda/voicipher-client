import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MessageModel, SidebarItemModel } from 'projects/voc-components/src/public-api';
import { Observable, Subject } from 'rxjs';
import { MsalService } from '@profile/service/msal.service';
import { IdentityPageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getCurrentIdentity } from '@profile/state/selectors/Identity.selectors';
import { Identity } from '@profile/core/models';
import { getCurrentLanguage } from '@profile/state/selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public identity$: Observable<Identity> | undefined;

    public sidebarItems: SidebarItemModel[] = [];

    public messages: MessageModel[] = [
        {
            title: 'Message title',
            body: 'Message body',
            url: ['/messages', '1']
        }
    ];

    public constructor(
        private store: Store<AppState>,
        private msalService: MsalService,
        private translateService: TranslateService) { }

    public ngOnInit(): void {
        this.store.dispatch(IdentityPageAction.loadCurrentIdentityRequest());
        this.identity$ = this.store.select(getCurrentIdentity);

        this.store
            .select(getCurrentLanguage)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.initializeSidebarItems());
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    public logout(): void {
        this.msalService.logout();
    }

    private initializeSidebarItems(): void {
        this.translateService
            .get(['Sidebar.Files', 'Sidebar.Overview', 'Sidebar.Create', 'Sidebar.MessageCenter', 'Sidebar.RecycleBin'])
            .subscribe(translations => {
                this.sidebarItems = [
                    {
                        title: translations['Sidebar.Files'],
                        url: ['/files'],
                        items: [
                            {
                                title: translations['Sidebar.Overview'],
                                url: ['/files']
                            },
                            {
                                title: translations['Sidebar.Create'],
                                url: ['/files/create']
                            },
                        ]
                    },
                    {
                        title: translations['Sidebar.MessageCenter'],
                        url: ['/messages'],
                        items: []
                    },
                    {
                        title: translations['Sidebar.RecycleBin'],
                        url: ['/recycle-bin'],
                        items: []
                    }
                ];
            });
    }

}
