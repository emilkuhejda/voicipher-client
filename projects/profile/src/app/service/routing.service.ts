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

}
