import {call, put} from 'redux-saga/effects';

import {handleError} from '../actions';
import {receiveBlockSpreadsheets, receiveDwellingsSpreadsheets} from '../actions/spreadsheet';
import SpreadsheetsService from '../services/spreadsheet';

export function* fetchBlockSpreadsheets({params}) {
    try {
        const blocks = yield call(SpreadsheetsService.fetchBlockSpreadsheets, params);
        yield put(receiveBlockSpreadsheets(blocks));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchDwellingSpreadsheets({params}) {
    try {
        const dwellings = yield call(SpreadsheetsService.fetchDwellingSpreadsheets, params);
        yield put(receiveDwellingsSpreadsheets(dwellings));
    } catch (err) {
        yield put(handleError(err));
    }
}
