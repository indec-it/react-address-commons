export const USERS_FETCH_REQUESTED = 'USERS_FETCH_REQUESTED';
export const USERS_FETCH_SUCCEEDED = 'USERS_FETCH_SUCCEEDED';

export const requestUsers = (state, rol, term, skip) => ({
    type: USERS_FETCH_REQUESTED,
    state,
    rol,
    term,
    skip
});

export const receiveUsers = (users, usersCount, pageSize, states) => ({
    type: USERS_FETCH_SUCCEEDED,
    users,
    usersCount,
    pageSize,
    states
});

export const USER_FETCH_REQUESTED = 'USER_FETCH_REQUESTED';
export const USER_FETCH_SUCCEEDED = 'USER_FETCH_SUCCEEDED';

export const requestUser = id => ({
    type: USER_FETCH_REQUESTED,
    id
});

export const receiveUser = user => ({
    type: USER_FETCH_SUCCEEDED,
    user
});

export const USERS_FETCH_BY_STATE_REQUESTED = 'USERS_FETCH_BY_STATE_REQUESTED';
export const USERS_FETCH_BY_STATE_SUCCEEDED = 'USERS_FETCH_BY_STATE_SUCCEEDED';

export const requestFetchUsersByState = state => ({
    type: USERS_FETCH_BY_STATE_REQUESTED,
    state
});

export const receiveUsersByState = users => ({
    type: USERS_FETCH_BY_STATE_SUCCEEDED,
    users
});

export const USERS_FIND_REQUESTED = 'USERS_FIND_REQUESTED';
export const USERS_FIND_SUCCEEDED = 'USERS_FIND_SUCCEEDED';

export const requestFindUsers = () => ({type: USERS_FIND_REQUESTED});

export const receiveFindUsers = newUsers => ({type: USERS_FIND_SUCCEEDED, newUsers});
