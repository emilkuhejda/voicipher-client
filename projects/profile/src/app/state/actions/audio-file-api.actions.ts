import { createAction, props } from '@ngrx/store';
import { AudioFile } from '@profile/core/models/audio-file';

export const loadCurrentAudioFileSuccess = createAction(
    '[Audio File API] Load current audio file success',
    props<{ audioFile: AudioFile }>()
);

export const loadCurrentAudioFileFailure = createAction(
    '[Audio File API] Load current audio file failure',
    props<{ error: string }>()
);

export const loadAudioFilesSuccess = createAction(
    '[Audio File API] Load audio files success',
    props<{ audioFiles: AudioFile[] }>()
);

export const loadAudioFilesFailure = createAction(
    '[Audio File API] Load audio files failure',
    props<{ error: string }>()
);

export const createAudioFileEventReceived = createAction(
    '[Audio File API] Create audio file event received'
);

export const createAudioFileSuccess = createAction(
    '[Audio File API] Create audio file success',
    props<{ identifier: string; successMessage: string }>()
);

export const createAudioFilesFailure = createAction(
    '[Audio File API] Create audio file failure',
    props<{ identifier: string; error: string }>()
);

export const updateAudioFileSuccess = createAction(
    '[Audio File API] Update audio file success',
    props<{ identifier: string; successMessage: string }>()
);

export const updateAudioFilesFailure = createAction(
    '[Audio File API] Update audio file failure',
    props<{ identifier: string; error: string }>()
);
