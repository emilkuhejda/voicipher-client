import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Language } from '@profile/core/types/language';
import { LanguageHelper } from '@profile/core/utils/language-helper';
import { MessagePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getCurrentLanguage, getCurrentMessage } from '@profile/state/selectors';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MessageViewModel } from '../message-view.model';

@Component({
    selector: 'app-message-detail',
    templateUrl: './message-detail.component.html',
    styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public message$: Observable<MessageViewModel | undefined> | undefined;
    public currentLanguage: Language = 'Undefined';

    public constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        const messageId = this.route.snapshot.params.messageId;

        this.store.dispatch(MessagePageAction.loadCurrentMessageRequest({ messageId }));
        this.store
            .select(getCurrentLanguage)
            .pipe(takeUntil(this.destroy$))
            .subscribe(language => this.currentLanguage = LanguageHelper.convertFromString(language));
        this.message$ = this.store
            .select(getCurrentMessage)
            .pipe(
                takeUntil(this.destroy$),
                map(message => {
                    if (message) {
                        this.store.dispatch(MessagePageAction.markMessageAsOpenedRequest({ message }));

                        return new MessageViewModel(message, this.currentLanguage);
                    }

                    return undefined;
                })
            );
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

}
