import { LanguageVersion } from "./language-version";

export interface InformationMessage {
    id: string;
    isUserSpecific: boolean;
    wasOpened: boolean;
    dateUpdated: Date;
    datePublished: Date;
    languageVersions: LanguageVersion[];
}
