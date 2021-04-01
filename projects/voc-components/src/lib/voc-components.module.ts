import { NgModule } from '@angular/core';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';

const components = [
    MainComponent,
    SidebarComponent,
    TopbarComponent,
    LogoutDialogComponent
];

@NgModule({
    declarations: components,
    imports: [],
    exports: components
})
export class VocComponentsModule { }
