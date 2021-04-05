import { InformationMessage } from '@profile/core/models/information-message';
import { LanguageVersion } from '@profile/core/models/language-version';
import { Language } from '@profile/core/types/language';
import { MessageModel } from 'projects/voc-components/src/public-api';

export class MessageViewModel {
    private message: InformationMessage;
    private languageVersion: LanguageVersion | undefined;

    public id: string;
    public wasOpened: boolean;
    public title: string;
    public description: string;

    public constructor(message: InformationMessage, language: Language) {
        this.message = message;
        this.languageVersion = this.message.languageVersions.find(x => x.languageString === language);

        this.id = message.id;
        this.wasOpened = message.wasOpened;
        this.title = this.getTitle();
        this.description = this.getDescription();
    }

    public getTitle(): string {
        if (!this.languageVersion) {
            return '';
        }

        return this.languageVersion.title;
    }

    public getDescription(): string {
        if (!this.languageVersion) {
            return ''
        }

        return this.languageVersion.description;
    }

    public toMessageModel(): MessageModel {
        return {
            title: this.title,
            body: this.title,
            url: ['/messages', this.id]
        };
    }

}
