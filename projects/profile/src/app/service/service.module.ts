import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalService } from './msal.service';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { RoutingService } from './routing.service';
import { FileService } from './file.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { ErrorInterceptorService } from './error-interceptor.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        MsalService,
        StorageService,
        RoutingService,
        UserService,
        FileService,
        TokenInterceptorService,
        ErrorInterceptorService
    ]
})
export class ServiceModule { }
