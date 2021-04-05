import { Language } from '../types/language';

export interface LanguageVersion {
    id: string;
    informationMessageId: string;
    title: string;
    message: string;
    description: string;
    languageString: Language;
    sentOnOsx: boolean;
    sentOnAndroid: boolean;
}
