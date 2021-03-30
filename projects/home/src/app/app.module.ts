import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalizationComponent } from './localization/localization.component';
import { AboutComponent } from './localization/about/about.component';
import { environment } from '@home/environment';
import { ServiceModule } from '@home/service/service.module';
import { HomeComponent } from './home/home.component';
import { HowToComponent } from './localization/how-to/how-to.component';
import { PricingComponent } from './localization/pricing/pricing.component';
import { ContactComponent } from './localization/contact/contact.component';
import { PrivacyComponent } from './localization/privacy/privacy.component';
import { TermsComponent } from './localization/terms/terms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        NotFoundComponent,
        LocalizationComponent,
        HowToComponent,
        PricingComponent,
        ContactComponent,
        PrivacyComponent,
        TermsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ServiceModule,
        ReactiveFormsModule,
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
