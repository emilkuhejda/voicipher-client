import { createAction, props } from '@ngrx/store';

export const loadAudioFilesRequest = createAction(
    '[Recycle Bin Page] Load audio files request'
);

export const restoreAudioFilesRequest = createAction(
    '[Recycle Bin Page] Restore audio files request',
    props<{ audioFileIds: string[] }>()
);

export const permanentDeleteAudioFilesRequest = createAction(
    '[Recycle Bin Page] Permanent delete audio files request',
    props<{ audioFileIds: string[] }>()
);
