import { createReducer, on } from '@ngrx/store';
import { AudioFileApiAction, AudioFilePageAction } from '../actions';
import { FileState } from '../app.state';

const initialState: FileState = {
    currentUploadProgress: 0,
    currentFileIdentifier: '',
    uploadedFiles: [],
    audioFiles: [],
    successMessage: '',
    error: ''
};

export const fileReducer = createReducer<FileState>(
    initialState,
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
    on(AudioFilePageAction.createAudioFilesRequest, (state, action): FileState => ({
        ...state,
        uploadedFiles: [...state.uploadedFiles, { identifier: action.identifier, name: action.fileFormData.name }],
        successMessage: '',
        error: ''
    })),
    on(AudioFileApiAction.createAudioFileSuccess, (state, action): FileState => {
        const updatedFiles = state.uploadedFiles.filter(x => x.identifier !== action.identifier);
        return {
            ...state,
            currentFileIdentifier: '',
            uploadedFiles: updatedFiles,
            successMessage: action.successMessage,
            error: ''
        };
    }),
    on(AudioFileApiAction.createAudioFilesFailure, (state, action): FileState => {
        const updatedFiles = state.uploadedFiles.filter(x => x.identifier !== action.identifier);
        return {
            ...state,
            currentFileIdentifier: '',
            uploadedFiles: updatedFiles,
            successMessage: '',
            error: action.error
        };
    })
);
