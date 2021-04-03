import { createReducer, on } from '@ngrx/store';
import { AudioFileApiAction, AudioFilePageAction } from '../actions';
import { FileState } from '../app.state';

const initialState: FileState = {
    currentUploadedFile: undefined,
    uploadedFiles: [],
    audioFiles: [],
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
    on(AudioFilePageAction.changeUploadedFileProgressRequest, (state, action): FileState => {
        const updatedFiles = state.uploadedFiles
            .map(item => item.identifier === action.identifier
                ? { ...item, progress: action.progress }
                : item);

        return {
            ...state,
            uploadedFiles: updatedFiles
        };
    }),
    on(AudioFilePageAction.createAudioFilesRequest, (state, action): FileState => ({
        ...state,
        currentUploadedFile: { identifier: action.identifier, progress: 0 },
        uploadedFiles: [...state.uploadedFiles, { identifier: action.identifier, progress: 0 }]
    })),
    on(AudioFileApiAction.createAudioFileSuccess, (state, action): FileState => {
        const updatedFiles = state.uploadedFiles.filter(x => x.identifier !== action.identifier);
        return {
            ...state,
            currentUploadedFile: undefined,
            uploadedFiles: updatedFiles,
            error: ''
        };
    }),
    on(AudioFileApiAction.createAudioFilesFailure, (state, action): FileState => {
        const updatedFiles = state.uploadedFiles.filter(x => x.identifier !== action.identifier);
        return {
            ...state,
            currentUploadedFile: undefined,
            uploadedFiles: updatedFiles,
            error: action.error
        };
    })
);
