import {find} from 'lodash';

import {
    OVERVIEW_FETCH_REQUESTED,
    OVERVIEW_FETCH_SUCCEEDED,
    OVERVIEW_CLEAN_REDUCER,
    SET_MAP_STATE,
    CLEAN_MAP_SELECTION
} from '../actions';
import {
    BLOCKS_FOR_DASHBOARD_FETCH_SUCCEEDED,
    BLOCKS_FOR_DASHBOARD_FETCH_REQUESTED,
    DWELLINGS_FOR_DASHBOARD_FETCH_REQUESTED,
    DWELLINGS_FOR_DASHBOARD_FETCH_SUCCEEDED,
    DWELLINGS_TYPES_FOR_DASHBOARD_FETCH_REQUESTED,
    DWELLINGS_TYPES_FOR_DASHBOARD_FETCH_SUCCEEDED,
    LOGS_BY_STATE_FETCH_REQUESTED,
    LOGS_BY_STATE_FETCH_SUCCEEDED,
    LOGS_FOR_OVERVIEW_FETCH_REQUESTED,
    LOGS_FOR_OVERVIEW_FETCH_SUCCEEDED,
    SIDES_FOR_DASHBOARD_FETCH_REQUESTED,
    SIDES_FOR_DASHBOARD_FETCH_SUCCEEDED,
    USERS_FOR_OVERVIEW_FETCH_REQUESTED,
    USERS_FOR_OVERVIEW_FETCH_SUCCEEDED
} from '../actions/overview';

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
            return {...state, loading: true, profile: action.profile};
        case OVERVIEW_FETCH_SUCCEEDED:
            return {
                ...state,
                general: action.areas,
                availableStates: action.availableStates,
                isNationalCoordinator: action.isNationalCoordinator,
                selectedState: (
                    action.isNationalCoordinator
                        ? generalState : getState(action.general, state.profile.state, generalState)
                ),
                loading: false
            };
        case SET_MAP_STATE:
            if (state.isNationalCoordinator) {
                return {...state, selectedState: getState(state.general, action.state, state.selectedState)};
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
                logs: [],
                users: [],
                availableStates: null,
                selectedState: generalState
            };
        case LOGS_BY_STATE_FETCH_REQUESTED:
            return {...state, logs: []};
        case LOGS_BY_STATE_FETCH_SUCCEEDED:
            return {...state, logs: action.logs};
        case BLOCKS_FOR_DASHBOARD_FETCH_REQUESTED:
            return {...state, loadingBlocks: true};
        case BLOCKS_FOR_DASHBOARD_FETCH_SUCCEEDED:
            return {...state, loadingBlocks: false, blocks: action.blocks};
        case SIDES_FOR_DASHBOARD_FETCH_REQUESTED:
            return {...state, loadingSides: true};
        case SIDES_FOR_DASHBOARD_FETCH_SUCCEEDED:
            return {...state, loadingSides: false, sides: action.sides};
        case DWELLINGS_FOR_DASHBOARD_FETCH_REQUESTED:
            return {...state, loadingDwellings: true};
        case DWELLINGS_FOR_DASHBOARD_FETCH_SUCCEEDED:
            return {...state, loadingDwellings: false, dwellings: action.dwellings};
        case DWELLINGS_TYPES_FOR_DASHBOARD_FETCH_REQUESTED:
            return {...state, loadingDwellingsTypes: true};
        case DWELLINGS_TYPES_FOR_DASHBOARD_FETCH_SUCCEEDED:
            return {...state, loadingDwellingsTypes: false, dwellingsTypes: action.dwellingsTypes};
        case LOGS_FOR_OVERVIEW_FETCH_REQUESTED:
            return {...state, loadingLogs: true};
        case LOGS_FOR_OVERVIEW_FETCH_SUCCEEDED:
            return {...state, loadingLogs: false, logs: action.logs};
        case USERS_FOR_OVERVIEW_FETCH_REQUESTED:
            return {...state, loadingUsers: true};
        case USERS_FOR_OVERVIEW_FETCH_SUCCEEDED:
            return {...state, loadingUsers: false, users: action.users};
        default:
            return state;
    }
}
