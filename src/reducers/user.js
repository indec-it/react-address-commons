import {
    USERS_FETCH_SUCCEEDED,
    USERS_FETCH_REQUESTED,
    USER_FETCH_SUCCEEDED
} from '../actions/user';

export default function user(state = {saving: false, loading: false}, action) {
    switch (action.type) {
        case USERS_FETCH_SUCCEEDED:
            return {
                ...state,
                users: action.users,
                usersCount: action.usersCount,
                pageSize: action.pageSize,
                states: action.states,
                loading: false
            };
        case USERS_FETCH_REQUESTED:
            return {...state, users: [], loading: true};
        case USER_FETCH_SUCCEEDED:
            return {...state, user: action.user};
        default:
            return state;
    }
}
