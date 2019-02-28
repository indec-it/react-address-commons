import {call, put} from 'redux-saga/effects';

import {anErrorOccurred} from '../actions';
import {receiveSyncTask} from '../actions/log';
import SyncTaskService from '../services/log';

// eslint-disable-next-line
export function* fetchSyncTask({
    state, rol, term, skip
}) {
    try {
        const {logs, logsCount, pageSize} = yield call(SyncTaskService.fetchSyncTask, state, rol, term, skip);
        yield put(receiveSyncTask(logs, logsCount, pageSize));
    } catch (err) {
        yield put(anErrorOccurred(err));
    }
}
