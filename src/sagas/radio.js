import {call, put} from 'redux-saga/effects';

import {handleError} from '../actions/common';
import {receiveRadios} from '../actions/radios';
import RadioService from '../services/radio';

// eslint-disable-next-line
export function* fetchRadios({params}) {
    try {
        const radios = yield call(RadioService.fetchRadios, params);
        yield put(receiveRadios(radios));
    } catch (err) {
        yield put(handleError(err));
    }
}
