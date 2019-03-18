import {call, put} from 'redux-saga/effects';

import VersionService from '../services/version';
import {handleError, receiveVersion} from '../actions';

export const catchError = ({err}) => console.log(err);

export function* fetchVersion() {
    try {
        const {app: {version, date}} = yield call(VersionService.getVersion);
        yield put(receiveVersion(version, date));
    } catch (err) {
        yield put(handleError({handleError: true, errorMsg: err}));
    }
}
