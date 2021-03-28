import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './storage.service';
import { RouterService } from './router.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [StorageService, RouterService]
})
export class ServiceModule { }
