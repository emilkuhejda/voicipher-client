import { InformationMessage } from '@profile/core/models/information-message';
import { Language } from '@profile/core/types/language';

export class MessageViewModel {
    private message: InformationMessage;
    private language: Language;

    public id: string;
    public title: string;
    public wasOpened: boolean;

    public constructor(message: InformationMessage, language: Language) {
        this.message = message;
        this.language = language;

        this.id = message.id;
        this.wasOpened = message.wasOpened;
        this.title = this.getTitle();
    }

    public getTitle(): string {
        const languageVersion = this.message.languageVersions.find(x => x.languageString === this.language);
        if (languageVersion == undefined) {
            return '';
        }

        return languageVersion.title;
    }
}
