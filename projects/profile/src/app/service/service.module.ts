import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalService } from './msal.service';
import { StorageService } from './storage.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [MsalService, StorageService]
})
export class ServiceModule { }
