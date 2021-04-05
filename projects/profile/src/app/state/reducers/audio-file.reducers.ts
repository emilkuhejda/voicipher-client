import { createReducer, on } from '@ngrx/store';
import { AudioFileApiAction, AudioFilePageAction } from '../actions';
import { FileState } from '../app.state';

const initialState: FileState = {
    currentUploadProgress: 0,
    currentFileIdentifier: '',
    uploadedFiles: [],
    currentAudioFile: undefined,
    currentAudioSource: undefined,
    currentTranscribeItems: [],
    audioFiles: [],
    successMessage: '',
    error: ''
};

export const fileReducer = createReducer<FileState>(
    initialState,
    on(AudioFilePageAction.loadCurrentAudioFileRequest, (state): FileState => ({
        ...state,
        error: ''
    })),
    on(AudioFileApiAction.loadCurrentAudioFileSuccess, (state, action): FileState => ({
        ...state,
        currentAudioFile: action.audioFile,
        error: ''
    })),
    on(AudioFileApiAction.loadCurrentAudioFileFailure, (state, action): FileState => ({
        ...state,
        error: action.error
    })),
    on(AudioFilePageAction.loadCurrentAudioSourceRequest, (state): FileState => ({
        ...state,
        error: ''
    })),
    on(AudioFileApiAction.loadCurrentAudioSourceSuccess, (state, action): FileState => ({
        ...state,
        currentAudioSource: action.source,
        error: ''
    })),
    on(AudioFileApiAction.loadCurrentAudioSourceFailure, (state, action): FileState => ({
        ...state,
        error: action.error
    })),
    on(AudioFilePageAction.updateTranscriptRequest, (state): FileState => ({
        ...state,
        error: ''
    })),
    on(AudioFileApiAction.updateTranscriptFailure, (state, action): FileState => ({
        ...state,
        error: action.error
    })),
    on(AudioFilePageAction.loadCurrentTranscribeItemsRequest, (state): FileState => ({
        ...state,
        error: ''
    })),
    on(AudioFileApiAction.loadCurrentTranscribeItemsSuccess, (state, action): FileState => ({
        ...state,
        currentTranscribeItems: action.transcribeItems,
        error: ''
    })),
    on(AudioFileApiAction.loadCurrentTranscribeItemsFailure, (state, action): FileState => ({
        ...state,
        error: action.error
    })),
    on(AudioFilePageAction.loadAudioFilesRequest, (state): FileState => ({
        ...state,
        error: ''
    })),
    on(AudioFileApiAction.loadAudioFilesSuccess, (state, action): FileState => ({
        ...state,
        audioFiles: action.audioFiles,
        error: ''
    })),
    on(AudioFileApiAction.loadAudioFilesFailure, (state, action): FileState => ({
        ...state,
        error: action.error
    })),
    on(AudioFilePageAction.setCurrentFileIdentifier, (state, action): FileState => ({
        ...state,
        currentFileIdentifier: action.identifier,
        currentUploadProgress: 0
    })),
    on(AudioFilePageAction.changeUploadedFileProgressRequest, (state, action): FileState => {
        const progress = state.currentFileIdentifier === action.identifier
            ? action.progress
            : state.currentUploadProgress;

        return {
            ...state,
            currentUploadProgress: progress
        };
    }),
    on(AudioFilePageAction.uploadAudioFilesRequest, (state, action): FileState => ({
        ...state,
        uploadedFiles: [...state.uploadedFiles, { identifier: action.identifier, name: action.fileFormData.name }],
        successMessage: '',
        error: ''
    })),
    on(AudioFileApiAction.uploadAudioFileSuccess, (state, action): FileState => {
        const updatedFiles = state.uploadedFiles.filter(x => x.identifier !== action.identifier);
        return {
            ...state,
            currentFileIdentifier: '',
            uploadedFiles: updatedFiles,
            successMessage: action.successMessage,
            error: ''
        };
    }),
    on(AudioFileApiAction.uploadAudioFilesFailure, (state, action): FileState => {
        const updatedFiles = state.uploadedFiles.filter(x => x.identifier !== action.identifier);
        return {
            ...state,
            currentFileIdentifier: '',
            uploadedFiles: updatedFiles,
            successMessage: '',
            error: action.error
        };
    }),
    on(AudioFilePageAction.deleteAudioFileRequest, (state): FileState => ({
        ...state,
        successMessage: '',
        error: '',
    })),
    on(AudioFileApiAction.deleteAudioFileSuccess, (state, action): FileState => ({
        ...state,
        successMessage: action.successMessage,
        error: ''
    })),
    on(AudioFileApiAction.deleteAudioFileFailure, (state, action): FileState => ({
        ...state,
        error: action.error
    })),
    on(AudioFilePageAction.sendEmailRequest, (state): FileState => ({
        ...state,
        successMessage: '',
        error: ''
    })),
    on(AudioFileApiAction.sendEmailSuccess, (state, action): FileState => ({
        ...state,
        successMessage: action.successMessage,
        error: ''
    })),
    on(AudioFileApiAction.sendEmailFailure, (state, action): FileState => ({
        ...state,
        error: action.error
    }))
);
