import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from '@profile/components/components.module';
import { VocComponentsModule } from 'projects/voc-components/src/public-api';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '@profile/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileOverviewComponent } from './pages/file/file-overview/file-overview.component';
import { FileCreateComponent } from './pages/file/file-create/file-create.component';
import { FileEditComponent } from './pages/file/file-edit/file-edit.component';
import { FileDetailComponent } from './pages/file/file-detail/file-detail.component';
import { MessageDetailComponent } from './pages/message/message-detail/message-detail.component';
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
import { TokenInterceptorService } from '@profile/service/token-interceptor.service';
import { ErrorInterceptorService } from '@profile/service/error-interceptor.service';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ChipModule } from 'primeng/chip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
    declarations: [
        AppComponent,
        FileOverviewComponent,
        FileCreateComponent,
        FileEditComponent,
        FileDetailComponent,
        MessageOverviewComponent,
        MessageDetailComponent,
        RecycleBinComponent,
        NotFoundComponent,
        AccountComponent,
        RegisterUserComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ComponentsModule,
        VocComponentsModule,
        CoreModule,
        ServiceModule,
        ToastModule,
        ButtonModule,
        TooltipModule,
        ChipModule,
        ConfirmPopupModule,
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
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptorService,
            multi: true
        },
        MessageService,
        ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
