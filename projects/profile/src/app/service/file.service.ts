import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AudioFile } from "@profile/core/models/audio-file";
import { Observable } from "rxjs";
import { RoutingService } from "./routing.service";

@Injectable()
export class FileService {

    public constructor(private routingService: RoutingService, private httpClient: HttpClient) { }

    getAll(): Observable<AudioFile[]> {
        return this.httpClient.get<AudioFile[]>(this.routingService.getAudioFilesUrl());
    }

}