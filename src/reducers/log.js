import {
    FETCH_SYNC_LOG_REQUESTED,
    FETCH_SYNC_LOG_SUCCEEDED
} from '../actions';

export default function (state = {logs: []}, action) {
    switch (action.type) {
        case FETCH_SYNC_LOG_REQUESTED:
            return {...state, logs: [], loading: true};
        case FETCH_SYNC_LOG_SUCCEEDED:
            return {
                ...state,
                logs: action.logs,
                logsCount: action.logsCount,
                pageSize: action.pageSize,
                loading: false
            };
        default:
            return state;
    }
}
