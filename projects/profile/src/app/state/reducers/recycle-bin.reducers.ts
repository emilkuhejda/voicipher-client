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
    on(RecycleBinPageAction.loadAudioFilesRequest, (state): RecycleBinState => ({
        ...state,
        error: ''
    })),
    on(RecycleBinApiAction.loadAudioFilesSuccess, (state, action): RecycleBinState => ({
        ...state,
        audioFiles: action.audioFiles.slice().sort((a, b) => b.dateUpdatedUtc.getTime() - a.dateUpdatedUtc.getTime()),
        error: ''
    })),
    on(RecycleBinApiAction.loadAudioFilesFailure, (state, action): RecycleBinState => ({
        ...state,
        error: action.error
    })),
    on(RecycleBinPageAction.restoreAudioFilesRequest, (state, action): RecycleBinState => {
        const reducedAudioFiles = state.audioFiles.filter(x => !action.audioFileIds.includes(x.id));

        return {
            ...state,
            audioFiles: reducedAudioFiles.slice().sort((a, b) => b.dateUpdatedUtc.getTime() - a.dateUpdatedUtc.getTime()),
            successMessage: '',
            error: ''
        }
    }),
    on(RecycleBinPageAction.permanentDeleteAudioFilesRequest, (state, action): RecycleBinState => {
        const reducedAudioFiles = state.audioFiles.filter(x => !action.audioFileIds.includes(x.id));

        return {
            ...state,
            audioFiles: reducedAudioFiles.slice().sort((a, b) => b.dateUpdatedUtc.getTime() - a.dateUpdatedUtc.getTime()),
            successMessage: '',
            error: ''
        }
    }),
    on(RecycleBinApiAction.OperationSuccess, (state, action): RecycleBinState => {
        const reducedAudioFiles = state.audioFiles.filter(x => !action.audioFileIds.includes(x.id));

        return {
            ...state,
            audioFiles: reducedAudioFiles.slice().sort((a, b) => b.dateUpdatedUtc.getTime() - a.dateUpdatedUtc.getTime()),
            successMessage: action.successMessage,
            error: ''
        };
    }),
    on(RecycleBinApiAction.OperationFailure, (state, action): RecycleBinState => ({
        ...state,
        error: action.error
    }))
);
