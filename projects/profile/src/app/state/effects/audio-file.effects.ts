import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FileService } from '@profile/service/file.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AudioFileApiAction, AudioFilePageAction } from '../actions';

@Injectable()
export class AudioFileEffects {

    public constructor(private action$: Actions, private fileService: FileService) { }

    public loadAudioFile$ = createEffect(() => this.action$
        .pipe(
            ofType(AudioFilePageAction.loadAudioFilesRequest),
            mergeMap(() => this.fileService.getAll()
                .pipe(
                    map(audioFiles => AudioFileApiAction.loadAudioFilesSuccess({ audioFiles })),
                    catchError(error => of(AudioFileApiAction.loadAudioFilesFailure({ error: error })))
                ))
        ));

}