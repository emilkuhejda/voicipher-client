import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { ErrorResponse } from '@profile/core/models/error-response';
import { FileService } from '@profile/service/file.service';
import { catchError, concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { AudioFileApiAction, AudioFilePageAction } from '../actions';

@Injectable()
export class AudioFileEffects {

    public constructor(
        private action$: Actions,
        private fileService: FileService,
        private translateService: TranslateService) { }

    public loadAudioFile$ = createEffect(() => this.action$
        .pipe(
            ofType(AudioFilePageAction.loadAudioFilesRequest),
            mergeMap(() => this.fileService.getAll()
                .pipe(
                    map(audioFiles => AudioFileApiAction.loadAudioFilesSuccess({ audioFiles })),
                    catchError(() => this.translateService
                        .get('ErrorCode.None')
                        .pipe(map(translation => AudioFileApiAction.loadAudioFilesFailure({ error: translation }))))
                ))
        ));

    public cerateAudioFile$ = createEffect(() => this.action$
        .pipe(
            ofType(AudioFilePageAction.createAudioFilesRequest),
            concatMap(action => this.fileService.upload(action.fileFormData)
                .pipe(
                    switchMap((event: any) => {
                        if (event.type === HttpEventType.UploadProgress) {
                            const progress = {
                                identifier: action.identifier,
                                progress: Math.round(100 * event.loaded / event.total)
                            };

                            return [AudioFilePageAction.changeUploadedFileProgressRequest(progress)];
                        } else if (event instanceof HttpResponse) {
                            return this.translateService
                                .get('SuccessMessage.CreateAudioFile', { fileName: action.fileFormData.name })
                                .pipe(switchMap(translation => {
                                    return [
                                        AudioFileApiAction.createAudioFileSuccess({
                                            identifier: action.identifier,
                                            successMessage: translation
                                        }),
                                        AudioFilePageAction.loadAudioFilesRequest()
                                    ]
                                }));
                        } else {
                            return [AudioFileApiAction.createAudioFileEventReceived()];
                        }
                    }),
                    catchError((error: ErrorResponse) =>
                        this.translateService
                            .get(`ErrorCode.${error.errorCode}`)
                            .pipe(map(translation => AudioFileApiAction.createAudioFilesFailure({
                                identifier: action.identifier,
                                error: translation
                            }))))
                ))
        ));

}
