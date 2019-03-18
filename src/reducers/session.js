import {
    SESSION_RECEIVED,
    SESSION_REQUESTED
} from '../actions';

export default function session(state = {profile: null}, action) {
    switch (action.type) {
        case SESSION_REQUESTED:
            return {...state, loading: true, profile: null};
        case SESSION_RECEIVED:
            return {...state, profile: action.profile, loading: false};
        default:
            return state;
    }
}
