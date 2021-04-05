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
            .pipe(map(audioFiles => audioFiles.map(x => this.mapAudioFile(x))));
    }

    public upload(fileFormData: FileFormData): Observable<any> {
        let params = new HttpParams();
        params = params.append('name', fileFormData.name);
        params = params.append('language', fileFormData.language);
        params = params.append('fileName', fileFormData.uploadedFile.name);
        params = params.append('isPhoneCall', String(fileFormData.audioType === '1'));
        params = params.append('startTimeSeconds', fileFormData.transcriptionStartTime);
        params = params.append('endTimeSeconds', fileFormData.transcriptionEndTime);
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

    public update(audioFileId: string, fileFormData: FileFormData): Observable<any> {
        const formData = new FormData();
        formData.append('fileItemId', audioFileId);
        formData.append('name', fileFormData.name);
        formData.append('language', fileFormData.language);
        formData.append('isPhoneCall', String(fileFormData.audioType === '1'));
        formData.append('startTimeSeconds', fileFormData.transcriptionStartTime);
        formData.append('endTimeSeconds', fileFormData.transcriptionEndTime);
        formData.append('applicationId', environment.applicationId);

        if (fileFormData.uploadedFile) {
            formData.append('file', fileFormData.uploadedFile);
            formData.append('fileName', fileFormData.uploadedFile.name);
        }

        const uploadRequest = new HttpRequest('PUT', this.routingService.getUpdateFileItemUrl(), formData, {
            reportProgress: true
        });

        return this.httpClient.request(uploadRequest);
    }

    public delete(audioFileId: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('fileItemId', audioFileId);
        params = params.append('applicationId', environment.applicationId);

        return this.httpClient.delete(this.routingService.getDeleteFileItemUrl(), { params });
    }

    public restoreAll(audioFilesIds: string[]) {
        let params = new HttpParams();
        params = params.append('applicationId', environment.applicationId);

        return this.httpClient.put(this.routingService.getRestoreAllUrl(), audioFilesIds, { params });
    }

    public permanentDeleteAll(audioFilesIds: string[]) {
        let params = new HttpParams();
        params = params.append('applicationId', environment.applicationId);

        return this.httpClient.put(this.routingService.getPermanentDeleteAll(), audioFilesIds, { params });
    }

    public getDeletedAudioFiles(): Observable<AudioFile[]> {
        return this.httpClient
            .get<AudioFile[]>(this.routingService.getTemporaryDeletedFileItemsUrl())
            .pipe(map(audioFiles => audioFiles.map(x => this.mapAudioFile(x))));
    }

    public sendEmail(audioFileId: string, recipient: string): Observable<any> {
        const body = { fileItemId: audioFileId, recipient };
        return this.httpClient.post(this.routingService.getEmailUrl(), body);
    }

    private mapAudioFile(audioFile: AudioFile): AudioFile {
        audioFile.dateCreated = new Date(audioFile.dateCreated);
        audioFile.dateProcessedUtc = audioFile.dateProcessedUtc ? new Date(audioFile.dateProcessedUtc) : null;
        audioFile.dateUpdatedUtc = new Date(audioFile.dateUpdatedUtc);
        return audioFile;
    }

}
