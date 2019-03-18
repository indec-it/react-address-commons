import {MANUALS_FETCH_REQUESTED, MANUALS_FETCH_SUCCEEDED} from '../actions';

export default function manuals(state = {}, action) {
    switch (action.type) {
        case MANUALS_FETCH_REQUESTED:
            return {...state, manuals: []};
        case MANUALS_FETCH_SUCCEEDED:
            return {...state, manuals: action.manuals};
        default:
            return state;
    }
}
