import {call, put} from 'redux-saga/effects';

import {handleError} from '../actions/common';
import {receiveSides} from '../actions/sides';
import SideService from '../services/side';

// eslint-disable-next-line
export function* fetchSidesByBlock({block}) {
    try {
        const sides = yield call(SideService.fetchSidesByBlock, block);
        yield put(receiveSides(sides));
    } catch (err) {
        yield put(handleError(err));
    }
}
