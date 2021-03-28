import { Injectable } from '@angular/core';
import { pathPairs } from '../app-routing.module';
import { StorageService } from './storage.service';

@Injectable()
export class RouterService {
    public constructor(private storageService: StorageService) { }

    public getLink(pathKey: string): string[] {
        const language = this.storageService.getLanguage();
        const path = pathPairs[pathKey][language];
        return ['/', language, path];
    }
}