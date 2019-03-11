/* eslint-disable import/prefer-default-export,prefer-destructuring */
import {call, put} from 'redux-saga/effects';
import {filter, includes} from 'lodash';

import MonitoringService from '../services/monitoring';
import {handleError, clearError, receiveOverview} from '../actions';
import SyncTaskService from '../services/log';
import UserService from '../services/user';
import {roles} from '../constants';

export function* fetchOverview({profile}) {
    try {
        yield put(clearError());
        const isNationalCoordinator = includes(profile.roles, roles.NATIONAL_COORDINATOR);
        const general = (yield call(MonitoringService.fetchGeneralMonitoring)).areas;
        let logs = (yield call(SyncTaskService.fetchAllSyncTask)).logs;
        let response;
        let users;
        if (isNationalCoordinator) {
            response = yield call(MonitoringService.fetchResponseMonitoring);
            users = yield call(UserService.fetchAll);
        } else {
            response = yield call(MonitoringService.fetchResponseMonitoring, {stateId: profile.state});
            logs = filter(logs, log => log.user.state === profile.state);
            users = (yield call(UserService.fetch, profile.state)).users;
        }
        yield put(receiveOverview(
            general,
            response,
            logs,
            users,
            general.map(area => area._id.stateId),
            isNationalCoordinator
        ));
    } catch (err) {
        yield put(handleError(err));
    }
}
