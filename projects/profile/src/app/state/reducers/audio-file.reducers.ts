import { createReducer, on } from '@ngrx/store';
import { AudioFileApiAction, AudioFilePageAction } from '../actions';
import { FileState } from '../app.state';

const initialState: FileState = {
    currentUploadProgress: 0,
    currentFileIdentifier: '',
    uploadedFiles: [],
    currentAudioFile: undefined,
    audioFiles: [],
    successMessage: '',
    error: ''
};

export const fileReducer = createReducer<FileState>(
    initialState,
    on(AudioFileApiAction.loadCurrentAudioFileSuccess, (state, action): FileState => ({
        ...state,
        currentAudioFile: action.audioFile,
        error: ''
    })),
    on(AudioFileApiAction.loadCurrentAudioFileFailure, (state, action): FileState => ({
        ...state,
        error: action.error
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
    on(AudioFileApiAction.deleteAudioFileSuccess, (state, action): FileState => ({
        ...state,
        successMessage: action.successMessage,
        error: ''
    })),
    on(AudioFileApiAction.deleteAudioFileFailure, (state, action): FileState => ({
        ...state,
        error: action.error
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
