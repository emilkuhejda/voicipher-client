import { Injectable } from '@angular/core';
import { environment } from '@profile/environment';

type StorageKey = 'b2c.key' | 'language';

Injectable()
export class StorageService {
    private storage: Storage;

    public constructor() {
        this.storage = environment.storage;
    }

    public getToken(): string | null {
        return this.storage.getItem('b2c.key' as StorageKey);
    }

    public setToken(token: string) {
        this.storage.setItem('b2c.key' as StorageKey, token);
    }

    public removeToken() {
        this.storage.removeItem('b2c.key' as StorageKey);
    }

    public getLanguage(): string {
        return this.storage.getItem('language' as StorageKey) ?? environment.defaultLanguage;
    }

    public setLanguage(language: string): void {
        if (!environment.languages.find(x => x === language)) {
            language = environment.defaultLanguage;
        }

        this.storage.setItem('language' as StorageKey, language);
    }
}