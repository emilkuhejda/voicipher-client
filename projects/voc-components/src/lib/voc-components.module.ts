import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: components
})
export class VocComponentsModule { }
