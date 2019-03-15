import {call, put} from 'redux-saga/effects';

import {handleError} from '../actions/common';
import {receiveDwellings} from '../actions/dwellings';
import DwellingService from '../services/dwelling';

// eslint-disable-next-line
export function* fetchDwellingsBySide({side}) {
    try {
        const {dwellings, street} = yield call(DwellingService.fetchDwellingsBySide, side);
        yield put(receiveDwellings(dwellings, street));
    } catch (err) {
        yield put(handleError(err));
    }
}
