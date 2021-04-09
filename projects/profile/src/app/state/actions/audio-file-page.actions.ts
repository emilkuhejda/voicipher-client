import { createAction, props } from '@ngrx/store';
import { FileFormData, AudioFile, TranscribeModel, ProcessingProgress } from '@profile/core/models';
import { RecognitionState } from '@profile/core/types/recognition-state';

export const loadCurrentAudioFileRequest = createAction(
    '[Audio File Page] Load current audio file request',
    props<{ audioFileId: string }>()
);

export const loadCurrentTranscribeItemsRequest = createAction(
    '[Audio File Page] Load current transcribe items request',
    props<{ audioFileId: string }>()
);

export const loadCurrentAudioBlobSourceRequest = createAction(
    '[Audio File Page] Load current audio source request',
    props<{ transcribeItemId: string }>()
);

export const updateTranscriptRequest = createAction(
    '[Audio File Page] Update transcript request',
    props<{ transcribeItemId: string; transcript: string }>()
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

export const deleteAudioFileRequest = createAction(
    '[Audio File Page] Delete audio file request',
    props<{ audioFile: AudioFile }>()
);

export const startProcessingAudioFileRequest = createAction(
    '[Audio File Page] Start processing audio file request',
    props<{ transcribeModel: TranscribeModel }>()
);

export const loadProcessingProgressRequest = createAction(
    '[Audio File Page] Load processing progress request',
    props<{ audioFileId: string }>()
);

export const changeRecognitionProgressRequest = createAction(
    '[Audio File Page] Change recognition progress request',
    props<{ processingProgress: ProcessingProgress }>()
);

export const changeRecognitionStateRequest = createAction(
    '[Audio File Page] Change recognition state request',
    props<{ audioFileId: string; recognitionState: RecognitionState }>()
);

export const displayRecognitionErrorRequest = createAction(
    '[Audio File Page] Display recognition error request',
    props<{ fileName: string }>()
);

export const sendEmailRequest = createAction(
    '[Audio File Page] Send email request',
    props<{ audioFileId: string; recipient: string }>()
);
