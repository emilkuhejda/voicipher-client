import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { FileCreateComponent } from './pages/file/file-create/file-create.component';
import { FileOverviewComponent } from './pages/file/file-overview/file-overview.component';
import { MessageOverviewComponent } from './pages/message/message-overview/message-overview.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RecycleBinComponent } from './pages/recycle-bin/recycle-bin.component';

const routes: Routes = [
    { path: '', redirectTo: 'files', pathMatch: 'full' },
    { path: 'files', component: FileOverviewComponent },
    { path: 'files/create', component: FileCreateComponent },
    { path: 'account', component: AccountComponent },
    { path: 'messages', component: MessageOverviewComponent },
    { path: 'recycle-bin', component: RecycleBinComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
