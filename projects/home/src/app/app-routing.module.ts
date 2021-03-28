import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './localization/about/about.component';
import { LocalizationComponent } from './localization/localization.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const pathPairs: { [key: string]: { [key: string]: string } } = {
    home: { en: '', sk: '' },
    about: { en: 'about', sk: 'o-nas' },
    howTo: { en: 'how-to', sk: 'ako-na-to' },
    pricing: { en: 'pricing', sk: 'cennik' },
    contact: { en: 'contact', sk: 'kontakt' },
    terms: { en: 'terms-of-use', sk: 'podmienky-pouzivania' },
    privacy: { en: 'privacy-policy', sk: 'ochrana-osobnych-udajov' }
};

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sk', component: HomeComponent },
    {
        path: ':lang', component: LocalizationComponent, children: [
            { path: pathPairs.about.en, component: AboutComponent },
            { path: pathPairs.about.sk, component: AboutComponent }
        ]
    },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
