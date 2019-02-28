import {call, put} from 'redux-saga/effects';

import {anErrorOccurred, clearError} from '../actions/common';
import {receiveUsers, receiveUser} from '../actions/user';
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
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: err}));
    }
}

export function* findUser({id}) {
    yield put(clearError());
    const user = yield call(UserService.findById, id);
    if (user.error) {
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: user.error}));
    } else {
        yield put(receiveUser(user));
    }
}
