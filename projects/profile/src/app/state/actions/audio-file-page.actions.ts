import { createAction, props } from '@ngrx/store';
import { FileFormData } from '@profile/core/models/file-form-data';

export const loadAudioFilesRequest = createAction(
    '[Audio File Page] Load audio files request'
);

export const changeUploadedFileProgressRequest = createAction(
    '[Audio File Page] Change uploaded file progress request',
    props<{ identifier: string; progress: number }>()
);

export const createAudioFilesRequest = createAction(
    '[Audio File Page] Create audio file request',
    props<{ identifier: string, fileFormData: FileFormData }>()
);
