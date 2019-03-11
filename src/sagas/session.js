/* eslint-disable import/prefer-default-export */
import {call, put} from 'redux-saga/effects';

import UserService from '../services/user';
import {handleError, receiveSession} from '../actions';

export function* fetchSession() {
    try {
        const profile = yield call(UserService.profile);
        if (profile.error) {
            yield put(handleError({handleError: true, errorMsg: profile.error}));
        } else {
            yield put(receiveSession(profile));
        }
    } catch (err) {
        yield put(receiveSession({}));
    }
}
