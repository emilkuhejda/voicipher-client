import { Component } from '@angular/core';
import { SidebarItemModel } from 'projects/voc-components/src/public-api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {

    public sidebarItems: SidebarItemModel[] = [
        {
            title: 'Files',
            url: ['/files'],
            items: [
                {
                    title: 'Overview',
                    url: ['/files']
                },
                {
                    title: 'Create',
                    url: ['/files/create']
                },
            ]
        },
        {
            title: 'Message center',
            url: ['/messages'],
            items: []
        },
        {
            title: 'Recycle Bin',
            url: ['/recycle-bin'],
            items: []
        }
    ];

    public constructor() { }
}
