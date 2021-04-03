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
