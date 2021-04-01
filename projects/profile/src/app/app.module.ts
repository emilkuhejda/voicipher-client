import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VocComponentsModule } from 'projects/voc-components/src/public-api';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '@profile/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FileOverviewComponent } from './pages/file/file-overview/file-overview.component';
import { FileCreateComponent } from './pages/file/file-create/file-create.component';
import { MessageOverviewComponent } from './pages/message/message-overview/message-overview.component';
import { RecycleBinComponent } from './pages/recycle-bin/recycle-bin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        FileOverviewComponent,
        FileCreateComponent,
        MessageOverviewComponent,
        RecycleBinComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        VocComponentsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            defaultLanguage: environment.defaultLanguage,
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
                deps: [HttpClient]
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
