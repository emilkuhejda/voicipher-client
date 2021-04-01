import { Component, Input } from '@angular/core';

@Component({
    selector: 'voc-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

    @Input()
    public avatarText: string = '';

    public constructor() { }

}
