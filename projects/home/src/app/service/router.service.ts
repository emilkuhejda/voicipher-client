import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { pathPairs } from '../app-routing.module';
import { StorageService } from './storage.service';
import { PagePath } from './types';

@Injectable()
export class RouterService {
    public constructor(private storageService: StorageService, private translateService: TranslateService) { }

    public getLink(pathKey: PagePath): string[] {
        const language = this.storageService.getLanguage();
        const path = pathPairs[pathKey][language];

        return ['/', language, path];
    }
}
