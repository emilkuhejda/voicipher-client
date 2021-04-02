import { createReducer, on } from '@ngrx/store';
import { AudioFileApiAction } from '../actions';
import { FileState } from '../app.state';

const initialState: FileState = {
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
    }))
);
