import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarItemModel } from './sidebar.models';

@Component({
    selector: 'voc-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    @Input()
    public headingText: string = '';

    @Input()
    public dataItems: SidebarItemModel[] = [];

    public constructor(private router: Router) { }

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                for (const item of this.dataItems) {
                    item.isActive = false;
                    for (const subNavItem of item.items) {
                        subNavItem.isActive = false;
                    }
                }

                const path = event.urlAfterRedirects;
                const navItem = this.dataItems.find(item => item.url.find(x => path.includes(x)));
                if (navItem) {
                    navItem.isActive = true;
                    const subNavItem = navItem.items.find(item => item.url.find(x => x.includes(path)));
                    if (subNavItem) {
                        subNavItem.isActive = true;
                    }
                }
            }
        });
    }

}
