import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarItemModel } from './sidebar.models';

@Component({
    selector: 'voc-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {

    private activePath: string = '';

    @Input()
    public headingText: string = '';

    @Input()
    public dataItems: SidebarItemModel[] = [];

    public constructor(private router: Router) { }

    public ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.activePath = event.urlAfterRedirects;
                this.initializeActiveItem(this.activePath);
            }
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.dataItems) {
            this.initializeActiveItem(this.activePath);
        }
    }

    private initializeActiveItem(path: string): void {
        for (const item of this.dataItems) {
            item.isActive = false;
            for (const subNavItem of item.items) {
                subNavItem.isActive = false;
            }
        }

        const navItem = this.dataItems.find(item => item.url.find(x => path.includes(x)));
        if (navItem) {
            navItem.isActive = true;
            const subNavItem = navItem.items.find(item => item.url.find(x => x.includes(path)));
            if (subNavItem) {
                subNavItem.isActive = true;
            }
        }
    }

}
