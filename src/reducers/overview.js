import {find} from 'lodash';

import {
    OVERVIEW_FETCH_REQUESTED,
    OVERVIEW_FETCH_SUCCEEDED,
    OVERVIEW_CLEAN_REDUCER,
    SET_MAP_STATE,
    CLEAN_MAP_SELECTION
} from '../actions';

const generalState = {state: null, name: 'Argentina'};

const getState = (states, state, defaultState = null) => {
    const newState = find(states, ({_id}) => _id.state === state);
    if (newState) {
        return ({name: newState._id.stateName, state: newState._id.state});
    }
    return defaultState;
};

export default function overview(state = {loading: false}, action) {
    switch (action.type) {
        case OVERVIEW_FETCH_REQUESTED:
            return {...state, loading: true};
        case OVERVIEW_FETCH_SUCCEEDED:
            return {
                ...state,
                general: action.areas,
                response: action.response,
                logs: action.logs,
                users: action.users,
                availableStates: action.availableStates,
                isNationalCoordinator: action.isNationalCoordinator,
                selectedState: (
                    action.isNationalCoordinator
                        ? generalState : getState(action.areas, state.profile.state, generalState)
                ),
                loading: false
            };
        case SET_MAP_STATE:
            if (state.isNationalCoordinator) {
                return {...state, selectedState: getState(state.areas, action.state, state.selectedState)};
            }
            return {...state};
        case CLEAN_MAP_SELECTION:
            if (state.isNationalCoordinator) {
                return {...state, selectedState: generalState};
            }
            return {...state};
        case OVERVIEW_CLEAN_REDUCER:
            return {
                ...state,
                general: null,
                response: null,
                logs: null,
                users: null,
                availableStates: null,
                selectedState: generalState
            };
        default:
            return state;
    }
}
