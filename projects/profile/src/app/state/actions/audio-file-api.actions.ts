import { createAction, props } from '@ngrx/store';
import { AudioFile } from '@profile/core/models/audio-file';

export const loadAudioFilesSuccess = createAction(
    '[Audio File API] Load audio files success',
    props<{ audioFiles: AudioFile[] }>()
);

export const loadAudioFilesFailure = createAction(
    '[Audio File API] Load audio files failure',
    props<{ error: string }>()
);

export const createAudioFileEventReceived = createAction(
    '[Audio File Page] Create audio file event received'
);

export const createAudioFileSuccess = createAction(
    '[Audio File Page] Create audio file success',
    props<{ identifier: string; successMessage: string }>()
);

export const createAudioFilesFailure = createAction(
    '[Audio File Page] Create audio file failure',
    props<{ identifier: string; error: string }>()
);
