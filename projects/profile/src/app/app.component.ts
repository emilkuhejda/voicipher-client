import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MessageModel, SidebarItemModel } from 'projects/voc-components/src/public-api';
import { Observable, Subject } from 'rxjs';
import { MsalService } from '@profile/service/msal.service';
import { AccountPageAction, MessagePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { Identity } from '@profile/core/models';
import { map, takeUntil, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import {
    getCurrentLanguage,
    getCurrentIdentity,
    getFileModuleError,
    getFileModuleSuccessMessage,
    getMessageModuleError,
    getRecycleBinModuleError,
    getRecycleBinModuleSuccessMessage,
    getUploadedFiles,
    getMessageBoxMessages,
    getActiveMessagesCount,
    getAccountModuleError
} from './state/selectors';
import { MessageViewModel } from './pages/message/message-view.model';
import { Language } from './core/types/language';
import { LanguageHelper } from './core/utils/language-helper';
import { HubConnectionService } from './service/hub-connection.service';
import { environment } from '@profile/environment';

type ToastKey = 'primary' | 'secondary';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public identity$: Observable<Identity> | undefined;
    public sidebarItems: SidebarItemModel[] = [];
    public currentLanguage: Language = 'Undefined';

    public message$: Observable<MessageModel[]> | undefined;
    public activeMessage$: Observable<number> | undefined;

    public constructor(
        private store: Store<AppState>,
        private messageService: MessageService,
        private msalService: MsalService,
        private hubConnectionService: HubConnectionService,
        private translateService: TranslateService) { }

    public ngOnInit(): void {
        this.store.dispatch(AccountPageAction.loadCurrentIdentityRequest());

        this.store
            .select(getFileModuleSuccessMessage)
            .pipe(takeUntil(this.destroy$))
            .subscribe(message => this.handleSuccessMessage(message));
        this.store
            .select(getRecycleBinModuleSuccessMessage)
            .pipe(takeUntil(this.destroy$))
            .subscribe(message => this.handleSuccessMessage(message));
        this.store
            .select(getFileModuleError)
            .pipe(takeUntil(this.destroy$))
            .subscribe(message => this.handleErrorMessage(message));
        this.store
            .select(getAccountModuleError)
            .pipe(takeUntil(this.destroy$))
            .subscribe(message => this.handleErrorMessage(message));
        this.store
            .select(getMessageModuleError)
            .pipe(takeUntil(this.destroy$))
            .subscribe(message => this.handleErrorMessage(message));
        this.store
            .select(getRecycleBinModuleError)
            .pipe(takeUntil(this.destroy$))
            .subscribe(message => this.handleErrorMessage(message));
        this.store
            .select(getCurrentLanguage)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.initializeSidebarItems());
        this.store
            .select(getCurrentLanguage)
            .pipe(takeUntil(this.destroy$))
            .subscribe(language => this.currentLanguage = LanguageHelper.convertFromString(language));

        this.identity$ = this.store.select(getCurrentIdentity)
            .pipe(
                takeUntil(this.destroy$),
                tap(identity => {
                    if (identity.id !== '') {
                        this.store.dispatch(MessagePageAction.loadMessagesRequest());
                        this.hubConnectionService.startConnection();
                    } else {
                        this.hubConnectionService.stopConnection();
                    }
                }));
        this.activeMessage$ = this.store.select(getActiveMessagesCount);
        this.message$ = this.store.select(getMessageBoxMessages)
            .pipe(
                takeUntil(this.destroy$),
                map(message => message.map(x => new MessageViewModel(x, this.currentLanguage).toMessageModel()))
            );

        this.translateService
            .get('AppComponent.UploadingFile')
            .subscribe(translation => {
                this.store
                    .select(getUploadedFiles)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(uploadedFiles => {
                        const toastKey: ToastKey = 'secondary';
                        this.messageService.clear(toastKey);
                        for (const uploadedFile of uploadedFiles) {
                            this.messageService.add({
                                key: toastKey,
                                severity: 'info',
                                detail: `${translation} ${uploadedFile.name}`,
                                sticky: true
                            });
                        }
                    });
            });
    }

    public ngOnDestroy(): void {
        this.hubConnectionService.stopConnection();
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    public getHomeUrl(): string {
        return environment.homeUrl;
    }

    public logout(): void {
        this.msalService.logout();
    }

    private handleSuccessMessage(message: string): void {
        if (message !== '') {
            const toastKey: ToastKey = 'primary';
            this.messageService.add({ key: toastKey, severity: 'success', detail: message });
        }
    }

    private handleErrorMessage(message: string): void {
        if (message !== '') {
            const toastKey: ToastKey = 'primary';
            this.messageService.add({ key: toastKey, severity: 'error', detail: message });
        }
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
