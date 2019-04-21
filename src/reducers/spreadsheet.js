import {chunkBlocksDwellings, getRadioData} from '../util';

import {
    BLOCK_SPREADSHEETS_FETCH_REQUESTED,
    BLOCK_SPREADSHEETS_FETCH_SUCCEEDED,
    DWELLING_SPREADSHEETS_FETCH_REQUESTED,
    DWELLING_SPREADSHEETS_FETCH_SUCCEEDED
} from '../actions/spreadsheet';

export default function spreadsheets(state = {}, action) {
    switch (action.type) {
        case BLOCK_SPREADSHEETS_FETCH_REQUESTED:
        case DWELLING_SPREADSHEETS_FETCH_REQUESTED:
            return {...state, loading: true};
        case BLOCK_SPREADSHEETS_FETCH_SUCCEEDED:
            return {
                ...state,
                loading: false,
                blocks: chunkBlocksDwellings({
                    blocks: action.blocks,
                    firstDwellingChunkSize: 10,
                    dwellingChunkSize: 14
                }),
                radioData: getRadioData(action.blocks)
            };
        case DWELLING_SPREADSHEETS_FETCH_SUCCEEDED:
            return {
                ...state,
                loading: false,
                dwellings: chunkBlocksDwellings({
                    blocks: action.dwellings,
                    firstDwellingChunkSize: 5,
                    dwellingChunkSize: 7
                }),
                radioData: getRadioData(action.dwellings)
            };
        default:
            return state;
    }
}
