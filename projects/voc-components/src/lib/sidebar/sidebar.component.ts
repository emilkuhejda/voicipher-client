import { Component, Input } from '@angular/core';
import { SidebarItemModel } from './sidebar.models';

@Component({
    selector: 'voc-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    @Input()
    public headingText: string = '';

    @Input()
    public dataItems: SidebarItemModel[] = [];

    public constructor() { }

}
