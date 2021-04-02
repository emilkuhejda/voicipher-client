import { Injectable } from '@angular/core';
import { environment } from '@profile/environment';

@Injectable()
export class RoutingService {

    public getRegisterUserUrl(): string {
        return environment.webApiUrl + 'api/b2c/v1/users/register/';
    }

    getAudioFilesUrl(): string {
        return environment.webApiUrl + "api/v1/files/";
    }

}
