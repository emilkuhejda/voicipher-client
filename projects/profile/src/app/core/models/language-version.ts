import { Language } from '../enums/language';

export interface LanguageVersion {
    id: string;
    informationMessageId: string;
    title: string;
    message: string;
    description: string;
    language: Language;
    sentOnOsx: boolean;
    sentOnAndroid: boolean;
}
