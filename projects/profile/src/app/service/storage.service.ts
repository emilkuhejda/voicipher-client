import { Injectable } from '@angular/core';
import { environment } from '@profile/environment';

type StorageKey = 'token' | 'b2c.token' | 'identity' | 'language';

Injectable()
export class StorageService {

    private storage: Storage;

    public constructor() {
        this.storage = environment.storage;
    }

    public getItem<T>(storageKey: StorageKey): T | null {
        return this.parseJSON(this.storage.getItem(storageKey));
    }

    public setItem(storageKey: StorageKey, value: string): void {
        this.storage.setItem(storageKey, JSON.stringify(value));
    }

    public removeToken(storageKey: StorageKey) {
        this.storage.removeItem(storageKey);
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

    private readonly parseJSON = (value: string | null): any => value ? JSON.parse(value) : null;
}