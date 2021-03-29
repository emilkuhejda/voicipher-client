import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './storage.service';
import { RouterService } from './router.service';
import { DynamicScriptLoaderService } from './dynamic-script-loader.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [StorageService, RouterService, DynamicScriptLoaderService]
})
export class ServiceModule { }
