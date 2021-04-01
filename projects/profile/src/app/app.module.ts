import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent, TopbarComponent, VocComponentsModule } from 'projects/voc-components/src/public-api';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        VocComponentsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
