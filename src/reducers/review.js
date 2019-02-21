import {STATES_FETCH_REQUESTED, STATES_FETCH_SUCCEEDED} from '../actions/review';

const defaultState = {
    loading: false
};

export default function review(state = defaultState, action) {
    switch (action.type) {
        case STATES_FETCH_REQUESTED:
            return {
                ...state,
                loading: true,
                states: []
            };
        case STATES_FETCH_SUCCEEDED:
            return {
                ...state, loading: false, states: action.states
            };
        default:
            return state;
    }
}
