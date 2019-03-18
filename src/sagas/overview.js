/* eslint-disable import/prefer-default-export,prefer-destructuring */
import {call, put} from 'redux-saga/effects';
import {filter} from 'lodash';

import MonitoringService from '../services/monitoring';
import {handleError, clearError, receiveOverview} from '../actions';
import SyncTaskService from '../services/log';
import UserService from '../services/user';
import {isNationalCoordinator} from '../util';

export function* fetchOverview({profile}) {
    try {
        yield put(clearError());
        const isNationalCoord = isNationalCoordinator(profile);
        const general = (yield call(MonitoringService.fetchGeneralMonitoring)).areas;
        let logs = (yield call(SyncTaskService.fetchAllSyncTask)).logs;
        let response;
        let users;
        if (isNationalCoord) {
            response = yield call(MonitoringService.fetchResponseMonitoring);
            users = yield call(UserService.fetchAll);
        } else {
            response = yield call(MonitoringService.fetchResponseMonitoring, {state: profile.state});
            logs = filter(logs, log => log.user.state === profile.state);
            users = (yield call(UserService.fetch, profile.state)).users;
        }
        yield put(receiveOverview(
            general,
            response,
            logs,
            users,
            general.map(area => area._id.state),
            isNationalCoord
        ));
    } catch (err) {
        yield put(handleError(err));
    }
}
