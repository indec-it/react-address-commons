import {call, put} from 'redux-saga/effects';

import {
    receiveUsers,
    receiveUser,
    receiveFindUsers,
    handleError,
    receiveUsersByState,
    clearError
} from '../actions';
import UserService from '../services/user';

export function* fetchUsers({
    state, rol, term, skip
}) {
    try {
        const {
            users, usersCount, pageSize, states
        } = yield call(UserService.fetch, state, rol, term, skip);
        yield put(receiveUsers(users, usersCount, pageSize, states));
    } catch (err) {
        yield put(handleError({handleError: true, errorMsg: err}));
    }
}

export function* findUsers() {
    yield put(clearError());
    const users = yield call(UserService.search);
    if (users.error) {
        yield put(handleError({handleError: true, errorMsg: users.error}));
    } else {
        yield put(receiveFindUsers(users));
    }
}

export function* findUser({id}) {
    yield put(clearError());
    const user = yield call(UserService.findById, id);
    if (user.error) {
        yield put(handleError({handleError: true, errorMsg: user.error}));
    } else {
        yield put(receiveUser(user));
    }
}

export function* fetchByState({state}) {
    try {
        const {users} = yield call(UserService.fetchByState, state);
        yield put(receiveUsersByState(users));
    } catch (err) {
        yield put(handleError({handleError: true, errorMsg: err}));
    }
}
