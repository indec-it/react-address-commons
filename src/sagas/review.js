import {call, put} from 'redux-saga/effects';

import {handleError, receiveStates} from '../actions';
import ReviewService from '../services/review';

// eslint-disable-next-line
export function* requestFetchStates() {
    try {
        const {states} = yield call(ReviewService.getStates);
        yield put(receiveStates(states));
    } catch (err) {
        yield put(handleError(err));
    }
}
