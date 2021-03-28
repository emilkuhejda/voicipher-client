import { Component } from '@angular/core';
import { DefaultComponent } from './default/default.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public isDefaultComponent: boolean = false;

    public constructor() { }

    public onActivate(component: Component) {
        this.isDefaultComponent = component instanceof DefaultComponent;
    }

}
