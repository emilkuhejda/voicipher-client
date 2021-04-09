import { createAction, props } from '@ngrx/store';
import { AudioFile } from '@profile/core/models/audio-file';
import { TranscribeItem } from '@profile/core/models/transcribe-item';
import { TranscribingAudio } from '@profile/core/models/transcribing-audio';

export const loadCurrentAudioFileSuccess = createAction(
    '[Audio File API] Load current audio file success',
    props<{ audioFile: AudioFile }>()
);

export const loadCurrentAudioFileFailure = createAction(
    '[Audio File API] Load current audio file failure',
    props<{ error: string }>()
);

export const loadCurrentTranscribeItemsSuccess = createAction(
    '[Audio File API] Load current transcribe items success',
    props<{ transcribeItems: TranscribeItem[] }>()
);

export const loadCurrentTranscribeItemsFailure = createAction(
    '[Audio File API] Load current transcribe items failure',
    props<{ error: string }>()
);

export const loadCurrentAudioBlobSourceSuccess = createAction(
    '[Audio File API] Load current audio source success',
    props<{ transcribeItemId: string; blob: Blob }>()
);

export const loadCurrentAudioBlobSourceFailure = createAction(
    '[Audio File API] Load current audio source failure',
    props<{ error: string }>()
);

export const updateTranscriptSuccess = createAction(
    '[Audio File API] Update transcript success',
    props<{ successMessage: string }>()
);

export const updateTranscriptFailure = createAction(
    '[Audio File API] Update transcript failure',
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

export const uploadAudioFileEventReceived = createAction(
    '[Audio File API] Upload audio file event received'
);

export const uploadAudioFileSuccess = createAction(
    '[Audio File API] Upload audio file success',
    props<{ identifier: string; successMessage: string }>()
);

export const uploadAudioFilesFailure = createAction(
    '[Audio File API] Upload audio file failure',
    props<{ identifier: string; error: string }>()
);

export const deleteAudioFileSuccess = createAction(
    '[Audio File API] Delete audio file success',
    props<{ successMessage: string }>()
);

export const deleteAudioFileFailure = createAction(
    '[Audio File API] Delete audio file failure',
    props<{ error: string }>()
);

export const startProcessingAudioFileSuccess = createAction(
    '[Audio File API] Start processing audio file success',
    props<{ audioFileId: string; successMessage: string }>()
);

export const startProcessingAudioFileFailure = createAction(
    '[Audio File API] Start processing audio file failure',
    props<{ error: string }>()
);

export const LoadProcessingProgressSuccess = createAction(
    '[Audio File API] Get processing progress success',
    props<{ transcribingAudio: TranscribingAudio }>()
);

export const sendEmailSuccess = createAction(
    '[Audio File API] Send email success',
    props<{ successMessage: string }>()
);

export const displayRecognitionErrorSuccess = createAction(
    '[Audio File API] Display recognition error success',
    props<{ error: string }>()
);

export const sendEmailFailure = createAction(
    '[Audio File API] Send email failure',
    props<{ error: string }>()
);
