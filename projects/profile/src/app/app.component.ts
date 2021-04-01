import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageModel, SidebarItemModel } from 'projects/voc-components/src/public-api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

    public sidebarItems: SidebarItemModel[] = [];

    public messages: MessageModel[] = [
        {
            title: 'Message title',
            body: 'Message body',
            url: ['/messages', '1']
        }
    ];

    public constructor(private translateService: TranslateService) { }

    public ngOnInit(): void {
        this.initializeSidebarItems();
    }

    public logout(): void {
        window.location.reload();
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
