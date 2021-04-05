import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InformationMessage } from '@profile/core/models/information-message';
import { MessagePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getMessages } from '@profile/state/selectors/message.selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-message-overview',
    templateUrl: './message-overview.component.html',
    styleUrls: ['./message-overview.component.scss']
})
export class MessageOverviewComponent implements OnInit {

    public message$: Observable<InformationMessage[]> | undefined;

    public constructor(private store: Store<AppState>) { }

    public ngOnInit(): void {
        this.store.dispatch(MessagePageAction.loadMessagesRequest());

        this.message$ = this.store.select(getMessages);
    }

}
