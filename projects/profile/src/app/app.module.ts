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
import { AccountComponent } from './pages/account/account.component';
import { StoreModule } from '@ngrx/store';
import { effects } from '@profile/state/effects';
import { reducers } from '@profile/state/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from '@profile/core/core.module';
import { ServiceModule } from '@profile/service/service.module';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

@NgModule({
    declarations: [
        AppComponent,
        FileOverviewComponent,
        FileCreateComponent,
        MessageOverviewComponent,
        RecycleBinComponent,
        NotFoundComponent,
        AccountComponent,
        RegisterUserComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        VocComponentsModule,
        HttpClientModule,
        CoreModule,
        ServiceModule,
        TranslateModule.forRoot({
            defaultLanguage: environment.defaultLanguage,
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
                deps: [HttpClient]
            }
        }),
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),
        EffectsModule.forRoot(effects)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
