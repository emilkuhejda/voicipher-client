import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AudioFilePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getCurrentTranscribeItems } from '@profile/state/selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-file-detail',
    templateUrl: './file-detail.component.html',
    styleUrls: ['./file-detail.component.scss']
})
export class FileDetailComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        const audioFileId = this.route.snapshot.params.fileId;
        this.store.dispatch(AudioFilePageAction.loadCurrentTranscribeItemsRequest({ audioFileId }));
        this.store.select(getCurrentTranscribeItems)
            .pipe(takeUntil(this.destroy$))
            .subscribe(transcribeItems => { });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

}
