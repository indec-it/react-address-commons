/* eslint-disable import/prefer-default-export,prefer-destructuring */
import {call, put, select} from 'redux-saga/effects';

import {handleError, clearError, receiveOverview} from '../actions';
import {receiveLogsByState} from '../actions/overview';
import MonitoringService from '../services/monitoring';
import SyncTaskService from '../services/log';
import UserService from '../services/user';

export function* fetchOverview({profile}) {
    try {
        yield put(clearError());
        const {isNationalCoordinator} = yield select(({session}) => session.profile);
        const {areas} = yield call(MonitoringService.fetchGeneralMonitoring);
        let logs;
        let response;
        let users;
        if (isNationalCoordinator) {
            users = yield call(UserService.fetchAll);
            response = yield call(MonitoringService.fetchResponseMonitoring);
            logs = yield call(SyncTaskService.fetchAllSyncTask);
        } else {
            logs = yield call(SyncTaskService.fetchSyncTaskByState, profile.state);
            users = (yield call(UserService.fetch, profile.state)).users;
            response = yield call(MonitoringService.fetchResponseMonitoring, {state: profile.state});
        }
        yield put(receiveOverview(
            areas,
            response,
            logs,
            users,
            areas.map(area => area._id.state),
            isNationalCoordinator
        ));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchLogsByState({state}) {
    try {
        const logs = yield call(SyncTaskService.fetchSyncTaskByState, state);
        yield put(receiveLogsByState(logs));
    } catch (err) {
        yield put(handleError(err));
    }
}
