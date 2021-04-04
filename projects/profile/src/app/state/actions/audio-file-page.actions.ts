import { createAction, props } from '@ngrx/store';
import { FileFormData } from '@profile/core/models/file-form-data';

export const loadCurrentAudioFileRequest = createAction(
    '[Audio File Page] Load current audio file request',
    props<{ audioFileId: string }>()
);

export const loadAudioFilesRequest = createAction(
    '[Audio File Page] Load audio files request'
);

export const setCurrentFileIdentifier = createAction(
    '[Audio File Page] Set current file identifier',
    props<{ identifier: string }>()
);

export const changeUploadedFileProgressRequest = createAction(
    '[Audio File Page] Change uploaded file progress request',
    props<{ identifier: string; progress: number }>()
);

export const uploadAudioFilesRequest = createAction(
    '[Audio File Page] Upload audio file request',
    props<{ identifier: string; audioFileId: string; fileFormData: FileFormData }>()
);
