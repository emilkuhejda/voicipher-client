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
import { getFileModuleError, getUploadedFiles } from './state/selectors/audio-file.selectors';
import { MessageService } from 'primeng/api';

type ToastKey = 'info' | 'error';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [MessageService]
})
export class AppComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public identity$: Observable<Identity> | undefined;
    public sidebarItems: SidebarItemModel[] = [];
    public messages: MessageModel[] = [];

    public constructor(
        private store: Store<AppState>,
        private messageService: MessageService,
        private msalService: MsalService,
        private translateService: TranslateService) { }

    public ngOnInit(): void {
        this.store.dispatch(IdentityPageAction.loadCurrentIdentityRequest());

        this.store
            .select(getFileModuleError)
            .pipe(takeUntil(this.destroy$))
            .subscribe(error => {
                if (error !== '') {
                    const toastKey: ToastKey = 'error';
                    this.messageService.add({ key: toastKey, severity: toastKey, detail: error });
                }
            });
        this.store
            .select(getCurrentLanguage)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.initializeSidebarItems());
        this.identity$ = this.store.select(getCurrentIdentity);

        this.translateService
            .get('AppComponent.UploadingFile')
            .subscribe(translation => {
                this.store
                    .select(getUploadedFiles)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(uploadedFiles => {
                        const toastKey: ToastKey = 'info';
                        this.messageService.clear(toastKey);
                        for (const uploadedFile of uploadedFiles) {
                            this.messageService.add({
                                key: toastKey,
                                severity: toastKey,
                                detail: `${translation} ${uploadedFile.name}`,
                                sticky: true
                            });
                        }
                    });
            });
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
