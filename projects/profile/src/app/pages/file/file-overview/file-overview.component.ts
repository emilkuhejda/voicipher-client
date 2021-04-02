import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@profile/state/app.state';

@Component({
    selector: 'app-file-overview',
    templateUrl: './file-overview.component.html',
    styleUrls: ['./file-overview.component.scss']
})
export class FileOverviewComponent implements OnInit {

    public constructor(private store: Store<AppState>) { }

    public ngOnInit(): void { }

}
