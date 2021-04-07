import { Injectable } from '@angular/core';
import { environment } from '@profile/environment';

@Injectable()
export class RoutingService {

    public getRegisterUserUrl(): string {
        return environment.webApiUrl + 'api/b2c/v1/users/register/';
    }

    public getAudioFilesUrl(): string {
        return environment.webApiUrl + 'api/v1/files/';
    }

    public getUploadFileItemUrl(): string {
        return environment.webApiUrl + 'api/v1/files/upload/';
    }

    public getUpdateFileItemUrl(): string {
        return environment.webApiUrl + 'api/v1/files/update/';
    }

    public getDeleteFileItemUrl(): string {
        return environment.webApiUrl + 'api/v1/files/delete/';
    }

    public getTemporaryDeletedFileItemsUrl(): string {
        return environment.webApiUrl + 'api/v1/files/temporary-deleted/';
    }

    public getPermanentDeleteAll(): string {
        return environment.webApiUrl + 'api/v1/files/permanent-delete-all/';
    }

    public getRestoreAllUrl(): string {
        return environment.webApiUrl + 'api/v1/files/restore-all/';
    }

    public getTranscribeItemsUrl(): string {
        return environment.webApiUrl + 'api/v1/transcribe-items/';
    }

    public getUpdateTranscriptUrl(): string {
        return environment.webApiUrl + 'api/v1/transcribe-items/update-transcript/';
    }

    public getTranscribeAudioUrl(): string {
        return environment.webApiUrl + 'api/v1/transcribe-items/audio-stream/';
    }

    public getTranscribeFileItemUrl(): string {
        return environment.webApiUrl + 'api/v1/files/transcribe/';
    }

    public getEmailUrl(): string {
        return environment.webApiUrl + 'api/v1/mail/';
    }

    public getInformationMessagesUrl(): string {
        return environment.webApiUrl + 'api/v1/information-messages/';
    }

    public getMarkMessageAsOpenedUrl(): string {
        return environment.webApiUrl + 'api/v1/information-messages/mark-as-opened/';
    }

    public getSubscriptionRemainingTimeUrl(): string {
        return environment.webApiUrl + 'api/v1/subscriptions/remaining-time/';
    }

}
