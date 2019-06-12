import {call, put, select} from 'redux-saga/effects';

import {handleError, receiveSyncTask} from '../actions';
import SyncTaskService from '../services/log';

// eslint-disable-next-line
export function* fetchSyncTask({
    state, rol, term, skip
}) {
    try {
        const {state: profileState, isNationalCoordinator} = yield select(({session}) => session.profile);
        const {logs, logsCount, pageSize} = yield call(
            SyncTaskService.fetchSyncTask, isNationalCoordinator ? state : profileState, rol, term, skip
        );
        yield put(receiveSyncTask(logs, logsCount, pageSize));
    } catch (err) {
        yield put(handleError(err));
    }
}
