import { createAction, props } from '@ngrx/store';
import { AudioFile } from '@profile/core/models';

export const loadAudioFilesSuccess = createAction(
    '[Recycle Bin API] Load audio files success',
    props<{ audioFiles: AudioFile[] }>()
);

export const loadAudioFilesFailure = createAction(
    '[Recycle Bin API] Load audio files failure',
    props<{ error: string }>()
);

export const operationSuccess = createAction(
    '[Recycle Bin API] Operation success',
    props<{ audioFileIds: string[]; successMessage: string }>()
);

export const operationFailure = createAction(
    '[Recycle Bin API] Operation failure',
    props<{ error: string }>()
);
