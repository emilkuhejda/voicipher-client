import { Component } from '@angular/core';
import { RouterService } from './service/router.service';
import { PagePath } from './service/types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public constructor(private routerService: RouterService) { }

    public getLink(path: PagePath): string[] {
        return this.routerService.getLink(path);
    }

}
