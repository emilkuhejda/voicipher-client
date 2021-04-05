import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranscribeItem } from '@profile/core/models/transcribe-item';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { RoutingService } from './routing.service';

@Injectable()
export class TranscribeItemService {

    public constructor(private routingService: RoutingService, private httpClient: HttpClient) { }

    public getAll(audioFileId: string): Observable<TranscribeItem[]> {
        return this.httpClient.get<TranscribeItem[]>(this.routingService.getTranscribeItemsUrl() + audioFileId);
    }

    public getAudio(transcribeItemId: string): Observable<any> {
        return this.httpClient.get(this.routingService.getTranscribeAudioUrl() + transcribeItemId, { responseType: 'blob' });
    }

    public updateTranscript(transcribeItemId: string, transcript: string): Observable<any> {
        const body = {
            transcribeItemId,
            applicationId: environment.applicationId,
            transcript
        };

        return this.httpClient.put(this.routingService.getUpdateTranscriptUrl(), body);
    }

}
