import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalService } from './msal.service';
import { StorageService } from './storage.service';
import { RoutingService } from './routing.service';
import { FileService } from './file.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { ErrorInterceptorService } from './error-interceptor.service';
import { InformationMessageService } from './information-message.service';
import { TranscribeItemService } from './transcribe-item.service';
import { AccountService } from './account.service';
import { HubConnectionService } from './hub-connection.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        MsalService,
        StorageService,
        RoutingService,
        FileService,
        TranscribeItemService,
        InformationMessageService,
        AccountService,
        HubConnectionService,
        TokenInterceptorService,
        ErrorInterceptorService
    ]
})
export class ServiceModule { }
