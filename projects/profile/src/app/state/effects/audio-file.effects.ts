import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { ErrorResponse } from '@profile/core/models/error-response';
import { FileService } from '@profile/service/file.service';
import { TranscribeItemService } from '@profile/service/transcribe-item.service';
import { catchError, concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { AudioFileApiAction, AudioFilePageAction } from '../actions';

@Injectable()
export class AudioFileEffects {

    public constructor(
        private action$: Actions,
        private fileService: FileService,
        private transcribeItemService: TranscribeItemService,
        private translateService: TranslateService) { }

    public loadAudioFile$ = createEffect(() => this.action$
        .pipe(
            ofType(AudioFilePageAction.loadCurrentAudioFileRequest),
            concatMap(action => this.fileService.get(action.audioFileId)
                .pipe(
                    map(audioFile => AudioFileApiAction.loadCurrentAudioFileSuccess({ audioFile })),
                    catchError(() => this.translateService
                        .get('ErrorMessage')
                        .pipe(map(translation => AudioFileApiAction.loadCurrentAudioFileFailure({ error: translation }))))
                ))
        ));

    public loadTranscribeItem$ = createEffect(() => this.action$
        .pipe(
            ofType(AudioFilePageAction.loadCurrentTranscribeItemsRequest),
            mergeMap(action => this.transcribeItemService.getAll(action.audioFileId)
                .pipe(
                    map(transcribeItems => AudioFileApiAction.loadCurrentTranscribeItemsSuccess({ transcribeItems })),
                    catchError(() => this.translateService
                        .get('ErrorMessage')
                        .pipe(map(translation => AudioFileApiAction.loadCurrentTranscribeItemsFailure({ error: translation }))))
                ))
        ));

    public loadAudioFiles$ = createEffect(() => this.action$
        .pipe(
            ofType(AudioFilePageAction.loadAudioFilesRequest),
            mergeMap(() => this.fileService.getAll()
                .pipe(
                    map(audioFiles => AudioFileApiAction.loadAudioFilesSuccess({ audioFiles })),
                    catchError(() => this.translateService
                        .get('ErrorMessage')
                        .pipe(map(translation => AudioFileApiAction.loadAudioFilesFailure({ error: translation }))))
                ))
        ));

    public uploadAudioFile$ = createEffect(() => this.action$
        .pipe(
            ofType(AudioFilePageAction.uploadAudioFilesRequest),
            concatMap(action => {
                const translationKey = action.audioFileId === '' ? 'SuccessMessage.CreateAudioFile' : 'SuccessMessage.UpdateAudioFile';
                const updateAction = action.audioFileId === ''
                    ? this.fileService.upload(action.fileFormData)
                    : this.fileService.update(action.audioFileId, action.fileFormData);

                return updateAction.pipe(
                    switchMap((event: any) => {
                        if (event.type === HttpEventType.UploadProgress) {
                            const progress = {
                                identifier: action.identifier,
                                progress: Math.round(100 * event.loaded / event.total)
                            };

                            return [AudioFilePageAction.changeUploadedFileProgressRequest(progress)];
                        } else if (event instanceof HttpResponse) {
                            return this.translateService
                                .get(translationKey, { fileName: action.fileFormData.name })
                                .pipe(switchMap(translation => [
                                    AudioFileApiAction.uploadAudioFileSuccess({
                                        identifier: action.identifier,
                                        successMessage: translation
                                    }),
                                    AudioFilePageAction.loadAudioFilesRequest()
                                ]));
                        } else {
                            return [AudioFileApiAction.uploadAudioFileEventReceived()];
                        }
                    }),
                    catchError((error: ErrorResponse) =>
                        this.translateService
                            .get(`ErrorCode.${error.errorCode}`)
                            .pipe(map(translation => AudioFileApiAction.uploadAudioFilesFailure({
                                identifier: action.identifier,
                                error: translation
                            }))))
                );
            })
        ));

    public deleteAudioFile$ = createEffect(() => this.action$
        .pipe(
            ofType(AudioFilePageAction.deleteAudioFileRequest),
            concatMap(action => this.fileService.delete(action.audioFile.id)
                .pipe(
                    switchMap(() => this.translateService
                        .get('SuccessMessage.DeleteAudioFile', { fileItem: action.audioFile.name })
                        .pipe(switchMap(translation => [
                            AudioFileApiAction.deleteAudioFileSuccess({ successMessage: translation }),
                            AudioFilePageAction.loadAudioFilesRequest()
                        ]))
                    ),
                    catchError(() => this.translateService
                        .get('ErrorMessage')
                        .pipe(map(translation => AudioFileApiAction.loadAudioFilesFailure({ error: translation })))
                    )
                ))
        ));

    public sendEmail$ = createEffect(() => this.action$
        .pipe(
            ofType(AudioFilePageAction.sendEmailRequest),
            concatMap(action => this.fileService.sendEmail(action.audioFileId, action.recipient)
                .pipe(
                    concatMap(() => this.translateService
                        .get('SuccessMessage.SendEmail')
                        .pipe(map(translation => AudioFileApiAction.sendEmailSuccess({ successMessage: translation })))),
                    catchError(() => this.translateService
                        .get('ErrorMessage')
                        .pipe(map(translation => AudioFileApiAction.sendEmailFailure({ error: translation }))))
                ))
        ));

}
