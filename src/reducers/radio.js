import {DWELLINGS_BY_SIDE_FETCH_REQUESTED, DWELLINGS_BY_SIDE_FETCH_SUCCEEDED} from '../actions/dwellings';
import {SIDES_BY_BLOCK_FETCH_REQUESTED, SIDES_BY_BLOCK_FETCH_SUCCEEDED} from '../actions/sides';
import {RADIOS_FETCH_SUCCEEDED} from '../actions/radios';

export default function radio(state = {}, action) {
    switch (action.type) {
        case DWELLINGS_BY_SIDE_FETCH_REQUESTED:
            return {
                ...state, dwellings: [], street: {}, side: {}, loadingDwellings: true
            };
        case DWELLINGS_BY_SIDE_FETCH_SUCCEEDED:
            return {
                ...state, dwellings: action.dwellings, street: action.street, loadingDwellings: false
            };
        case RADIOS_FETCH_SUCCEEDED:
            return {...state, radios: action.radios};
        case SIDES_BY_BLOCK_FETCH_REQUESTED:
            return {...state, loadingSides: true, sides: []};
        case SIDES_BY_BLOCK_FETCH_SUCCEEDED:
            return {...state, sides: action.sides, loadingSides: false};
        default:
            return state;
    }
}
