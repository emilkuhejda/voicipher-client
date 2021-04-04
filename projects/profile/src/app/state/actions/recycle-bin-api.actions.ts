import { createAction, props } from '@ngrx/store';
import { AudioFile } from '@profile/core/models/audio-file';

export const loadAudioFilesSuccess = createAction(
    '[Recycle Bin API] Load audio files success',
    props<{ audioFiles: AudioFile[] }>()
);

export const loadAudioFilesFailure = createAction(
    '[Recycle Bin API] Load audio files failure',
    props<{ error: string }>()
);

export const restoreAudioFilesSuccess = createAction(
    '[Recycle Bin API] Restore audio files success',
    props<{ audioFileIds: string[] }>()
);

export const restoreAudioFilesFailure = createAction(
    '[Recycle Bin API] Restore audio files failure',
    props<{ error: string }>()
);

export const permanentDeleteAudioFilesSuccess = createAction(
    '[Recycle Bin API] Permanent delete audio files success',
    props<{ audioFileIds: string[] }>()
);

export const permanentDeleteAudioFilesFailure = createAction(
    '[Recycle Bin API] Permanent delete audio files failure',
    props<{ error: string }>()
);
