import {call, put} from 'redux-saga/effects';

import {anErrorOccurred} from '../actions';
import {receiveStates} from '../actions/review';
import ReviewService from '../services/review';

// eslint-disable-next-line
export function* requestFetchStates() {
    try {
        const {states} = yield call(ReviewService.getStates);
        yield put(receiveStates(states));
    } catch (err) {
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: err}));
    }
}
