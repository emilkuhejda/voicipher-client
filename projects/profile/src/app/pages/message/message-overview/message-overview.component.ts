import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InformationMessage } from '@profile/core/models/information-message';
import { Language } from '@profile/core/types/language';
import { LanguageHelper } from '@profile/core/utils/language-helper';
import { MessagePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getCurrentLanguage } from '@profile/state/selectors';
import { getMessages } from '@profile/state/selectors/message.selectors';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-message-overview',
    templateUrl: './message-overview.component.html',
    styleUrls: ['./message-overview.component.scss']
})
export class MessageOverviewComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public message$: Observable<InformationMessage[]> | undefined;
    public currentLanguage: Language = 'Undefined';

    public constructor(private store: Store<AppState>) { }

    public ngOnInit(): void {
        this.store.dispatch(MessagePageAction.loadMessagesRequest());
        this.store
            .select(getCurrentLanguage)
            .subscribe(language => this.currentLanguage = LanguageHelper.convertFromString(language));

        this.message$ = this.store.select(getMessages);
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    public getTitle(message: InformationMessage): string {
        const languageVersion = message.languageVersions.find(x => x.languageString === this.currentLanguage);
        if (languageVersion == undefined) {
            return '';
        }

        return languageVersion.title;
    }

}
