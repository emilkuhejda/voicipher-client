import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AudioFile } from '@profile/core/models/audio-file';
import { FileFormData } from '@profile/core/models/file-form-data';
import { environment } from '@profile/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from './routing.service';

@Injectable()
export class FileService {

    public constructor(private routingService: RoutingService, private httpClient: HttpClient) { }

    public get(fileItemId: string): Observable<AudioFile> {
        return this.httpClient.get<AudioFile>(this.routingService.getAudioFilesUrl() + fileItemId);
    }

    public getAll(): Observable<AudioFile[]> {
        return this.httpClient.get<AudioFile[]>(this.routingService.getAudioFilesUrl())
            .pipe(
                map(audioFiles => {
                    for (const audioFile of audioFiles) {
                        audioFile.dateCreated = new Date(audioFile.dateCreated);
                        audioFile.dateProcessedUtc = audioFile.dateProcessedUtc ? new Date(audioFile.dateProcessedUtc) : null;
                        audioFile.dateUpdatedUtc = new Date(audioFile.dateUpdatedUtc);
                    }

                    return audioFiles;
                })
            );
    }

    public upload(fileFormData: FileFormData) {
        let params = new HttpParams();
        params = params.append('name', fileFormData.name);
        params = params.append('language', fileFormData.language);
        params = params.append('fileName', fileFormData.uploadedFile.name);
        params = params.append('isPhoneCall', String(fileFormData.audioType === '1'));
        params = params.append('startTimeSeconds', '0');
        params = params.append('endTimeSeconds', '0');
        params = params.append('dateCreated', new Date().toISOString());
        params = params.append('applicationId', environment.applicationId);

        const formData = new FormData();
        formData.append('file', fileFormData.uploadedFile);

        const uploadRequest = new HttpRequest('POST', this.routingService.getUploadFileItemUrl(), formData, {
            params,
            reportProgress: true
        });

        return this.httpClient.request(uploadRequest);
    }

}
