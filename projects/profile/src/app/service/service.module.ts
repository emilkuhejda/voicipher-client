import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalService } from './msal.service';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { RoutingService } from './routing.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        MsalService,
        StorageService,
        RoutingService,
        UserService
    ]
})
export class ServiceModule { }
