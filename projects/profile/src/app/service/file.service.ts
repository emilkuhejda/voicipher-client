import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AudioFile } from '@profile/core/models/audio-file';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from './routing.service';

@Injectable()
export class FileService {

    public constructor(private routingService: RoutingService, private httpClient: HttpClient) { }

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

}
