import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Language } from '@profile/core/types/language';
import { LanguageHelper } from '@profile/core/utils/language-helper';
import { MessagePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getCurrentLanguage, getMessages } from '@profile/state/selectors';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MessageViewModel } from '../message-view.model';

@Component({
    selector: 'app-message-overview',
    templateUrl: './message-overview.component.html',
    styleUrls: ['./message-overview.component.scss']
})
export class MessageOverviewComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public message$: Observable<MessageViewModel[]> | undefined;
    public currentLanguage: Language = 'Undefined';

    public constructor(private store: Store<AppState>) { }

    public ngOnInit(): void {
        this.store.dispatch(MessagePageAction.loadMessagesRequest());
        this.store
            .select(getCurrentLanguage)
            .pipe(takeUntil(this.destroy$))
            .subscribe(language => this.currentLanguage = LanguageHelper.convertFromString(language));

        this.message$ = this.store
            .select(getMessages)
            .pipe(
                takeUntil(this.destroy$),
                map(messages => messages.map(x => new MessageViewModel(x, this.currentLanguage)))
            );
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

}
