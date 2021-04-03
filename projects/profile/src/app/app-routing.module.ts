import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@profile/core/guards/auth.guard';
import { MsalGuard } from './core/guards/msal.guard';
import { AccountComponent } from './pages/account/account.component';
import { FileCreateComponent } from './pages/file/file-create/file-create.component';
import { FileDetailComponent } from './pages/file/file-detail/file-detail.component';
import { FileEditComponent } from './pages/file/file-edit/file-edit.component';
import { FileOverviewComponent } from './pages/file/file-overview/file-overview.component';
import { MessageDetailComponent } from './pages/message/message-detail/message-detail.component';
import { MessageOverviewComponent } from './pages/message/message-overview/message-overview.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RecycleBinComponent } from './pages/recycle-bin/recycle-bin.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

const routes: Routes = [
    { path: '', redirectTo: 'files', pathMatch: 'full' },
    { path: 'files', component: FileOverviewComponent, canActivate: [AuthGuard] },
    { path: 'files/create', component: FileCreateComponent, canActivate: [AuthGuard] },
    { path: 'files/edit/:fileId', component: FileEditComponent, canActivate: [AuthGuard] },
    { path: 'files/:fileId', component: FileDetailComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'messages', component: MessageOverviewComponent, canActivate: [AuthGuard] },
    { path: 'messages/:messageId', component: MessageDetailComponent, canActivate: [AuthGuard] },
    { path: 'recycle-bin', component: RecycleBinComponent, canActivate: [AuthGuard] },
    { path: 'register-user', component: RegisterUserComponent, canActivate: [MsalGuard] },
    { path: '404', component: NotFoundComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
