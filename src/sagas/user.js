import {call, put} from 'redux-saga/effects';

import {handleError} from '../actions/common';
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
        yield put(handleError(err));
    }
}

export function* findUser({id}) {
    try {
        const user = yield call(UserService.findById, id);
        yield put(receiveUser(user));
    } catch (err) {
        yield put(handleError(err));
    }
}
