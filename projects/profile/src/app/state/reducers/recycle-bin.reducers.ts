import { createReducer, on } from '@ngrx/store';
import { RecycleBinApiAction, RecycleBinPageAction } from '../actions';
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
        audioFiles: action.audioFiles.slice().sort((a, b) => b.dateUpdatedUtc.getTime() - a.dateUpdatedUtc.getTime()),
        error: ''
    })),
    on(RecycleBinApiAction.loadAudioFilesFailure, (state, action): RecycleBinState => ({
        ...state,
        error: action.error
    })),
    on(RecycleBinPageAction.restoreAudioFilesRequest, (state): RecycleBinState => ({
        ...state,
        successMessage: ''
    })),
    on(RecycleBinApiAction.restoreAudioFilesSuccess, (state, action): RecycleBinState => {
        const reducedAudioFiles = state.audioFiles.filter(x => !action.audioFileIds.find(id => id === x.id));

        return {
            ...state,
            audioFiles: reducedAudioFiles.slice().sort((a, b) => b.dateUpdatedUtc.getTime() - a.dateUpdatedUtc.getTime()),
            successMessage: action.successMessage
        };
    }),
    on(RecycleBinApiAction.restoreAudioFilesFailure, (state): RecycleBinState => ({
        ...state,
        error: ''
    })),
    on(RecycleBinPageAction.permanentDeleteAudioFilesRequest, (state): RecycleBinState => ({
        ...state,
        successMessage: ''
    })),
    on(RecycleBinApiAction.permanentDeleteAudioFilesSuccess, (state, action): RecycleBinState => {
        const reducedAudioFiles = state.audioFiles.filter(x => !action.audioFileIds.find(id => id === x.id));

        return {
            ...state,
            audioFiles: reducedAudioFiles.slice().sort((a, b) => b.dateUpdatedUtc.getTime() - a.dateUpdatedUtc.getTime()),
            successMessage: action.successMessage
        };
    }),
    on(RecycleBinApiAction.permanentDeleteAudioFilesFailure, (state): RecycleBinState => ({
        ...state,
        error: ''
    }))
);
