import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';

const components = [
    SidebarComponent,
    TopbarComponent
];

@NgModule({
    declarations: components,
    imports: [],
    exports: components
})
export class VocComponentsModule { }
