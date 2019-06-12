/* eslint-disable import/prefer-default-export,prefer-destructuring */
import {call, put, select} from 'redux-saga/effects';
import {filter} from 'lodash';

import MonitoringService from '../services/monitoring';
import {handleError, clearError, receiveOverview} from '../actions';
import SyncTaskService from '../services/log';
import UserService from '../services/user';

export function* fetchOverview({profile}) {
    try {
        yield put(clearError());
        const {isNationalCoordinator} = yield select(({session}) => session.profile);
        const general = (yield call(MonitoringService.fetchGeneralMonitoring)).areas;
        let logs = (yield call(SyncTaskService.fetchAllSyncTask)).logs;
        let response;
        let users;
        if (isNationalCoordinator) {
            users = yield call(UserService.fetchAll);
            response = yield call(MonitoringService.fetchResponseMonitoring);
        } else {
            logs = filter(logs, log => log.user.state === profile.state);
            users = (yield call(UserService.fetch, profile.state)).users;
            response = yield call(MonitoringService.fetchResponseMonitoring, {state: profile.state});
        }
        yield put(receiveOverview(
            general,
            response,
            logs,
            users,
            general.map(area => area._id.state),
            isNationalCoordinator
        ));
    } catch (err) {
        yield put(handleError(err));
    }
}
