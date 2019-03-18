/* eslint-disable import/prefer-default-export */
import {call, put} from 'redux-saga/effects';

import ManualsService from '../services/manuals';
import {handleError, receiveManuals} from '../actions';

export function* fetchManuals() {
    try {
        const {manuals} = yield call(ManualsService.getManuals);
        yield put(receiveManuals(manuals));
    } catch (err) {
        yield put(handleError({handleError: true, errorMsg: err}));
    }
}
