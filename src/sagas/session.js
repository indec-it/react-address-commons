/* eslint-disable import/prefer-default-export */
import {call, put} from 'redux-saga/effects';

import UserService from '../services/user';
import {handleError, receiveSession} from '../actions';
import {isNationalCoordinator} from '../util';

export function* fetchSession() {
    try {
        const profile = yield call(UserService.profile);
        if (profile.error) {
            yield put(handleError(profile.error));
        } else {
            yield put(receiveSession({...profile, isNationalCoordinator: isNationalCoordinator(profile)}));
        }
    } catch (err) {
        yield put(receiveSession(null));
    }
}
