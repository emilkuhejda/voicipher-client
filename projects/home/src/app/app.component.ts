import { Component } from '@angular/core';
import { RouterService } from '@home/service/router.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = 'home';

    constructor(private routerService: RouterService) {
        const link = this.routerService.getLink('about');
        console.log(link);
    }
}
