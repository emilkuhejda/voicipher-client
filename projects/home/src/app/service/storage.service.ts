import { Injectable } from '@angular/core';
import { environment } from '@home/environment';

type StorageKey = 'language';

@Injectable()
export class StorageService {
    private languageKey: StorageKey = 'language';
    private storage: Storage;

    public constructor() {
        this.storage = environment.storage;
    }

    public getLanguage(): string {
        return this.storage.getItem(this.languageKey) ?? environment.defaultLanguage;
    }

    public setLanguage(language: string): void {
        if (!environment.languages.find(x => x === language)) {
            language = environment.defaultLanguage;
        }

        this.storage.setItem(this.languageKey, language);
    }
}
