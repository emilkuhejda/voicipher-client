import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { FileService } from '@profile/service/file.service';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { RecycleBinApiAction, RecycleBinPageAction } from '../actions';

@Injectable()
export class RecycleBinEffects {

    public constructor(
        private action$: Actions,
        private fileService: FileService,
        private translateService: TranslateService) { }

    public loadAudioFiles$ = createEffect(() => this.action$
        .pipe(
            ofType(RecycleBinPageAction.loadAudioFilesRequest),
            mergeMap(() => this.fileService.getDeletedAudioFiles()
                .pipe(
                    map(audioFiles => RecycleBinApiAction.loadAudioFilesSuccess({ audioFiles })),
                    catchError(() => this.translateService
                        .get('ErrorMessage')
                        .pipe(map(translation => RecycleBinApiAction.loadAudioFilesFailure({ error: translation }))))
                ))
        ));

    public restoreAudioFiles$ = createEffect(() => this.action$
        .pipe(
            ofType(RecycleBinPageAction.restoreAudioFilesRequest),
            concatMap(action => this.fileService.restoreAll(action.audioFileIds)
                .pipe(
                    map(() => RecycleBinApiAction.restoreAudioFilesSuccess({ audioFileIds: action.audioFileIds })),
                    catchError(() => this.translateService
                        .get('ErrorMessage')
                        .pipe(map(translation => RecycleBinApiAction.restoreAudioFilesFailure({ error: translation }))))
                ))
        ));

    public deleteAudioFiles$ = createEffect(() => this.action$
        .pipe(
            ofType(RecycleBinPageAction.permanentDeleteAudioFilesRequest),
            concatMap(action => this.fileService.permanentDeleteAll(action.audioFileIds)
                .pipe(
                    map(() => RecycleBinApiAction.permanentDeleteAudioFilesSuccess({ audioFileIds: action.audioFileIds })),
                    catchError(() => this.translateService
                        .get('ErrorMessage')
                        .pipe(map(translation => RecycleBinApiAction.permanentDeleteAudioFilesFailure({ error: translation }))))
                ))
        ));
}
