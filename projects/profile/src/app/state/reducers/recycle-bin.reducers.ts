import { createReducer, on } from '@ngrx/store';
import { RecycleBinApiAction } from '../actions';
import { RecycleBinState } from '../app.state';

const initialState: RecycleBinState = {
    audioFiles: [],
    successMessage: '',
    error: ''
};

export const recycleBinReducer = createReducer<RecycleBinState>(
    initialState,
    on(RecycleBinApiAction.loadAudioFilesSuccess, (state, action): RecycleBinState => ({
        ...state,
        audioFiles: action.audioFiles,
        error: ''
    })),
    on(RecycleBinApiAction.loadAudioFilesFailure, (state, action): RecycleBinState => ({
        ...state,
        error: action.error
    })),
    on(RecycleBinApiAction.restoreAudioFilesSuccess, (state, action): RecycleBinState => {
        const reducedAudioFiles = state.audioFiles.filter(x => !action.audioFileIds.find(id => id === x.id));
        return {
            ...state,
            audioFiles: reducedAudioFiles
        };
    }),
    on(RecycleBinApiAction.restoreAudioFilesFailure, (state): RecycleBinState => ({
        ...state,
        error: ''
    })),
    on(RecycleBinApiAction.permanentDeleteAudioFilesSuccess, (state, action): RecycleBinState => {
        const reducedAudioFiles = state.audioFiles.filter(x => !action.audioFileIds.find(id => id === x.id));
        return {
            ...state,
            audioFiles: reducedAudioFiles
        };
    }),
    on(RecycleBinApiAction.permanentDeleteAudioFilesFailure, (state): RecycleBinState => ({
        ...state,
        error: ''
    }))
);
