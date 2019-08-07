/* eslint-disable prefer-destructuring */
import {call, put, select} from 'redux-saga/effects';
import {find, map, isEqual} from 'lodash';

import {handleError, receiveOverview} from '../actions';
import {receiveLogsByState} from '../actions/overview';
import MonitoringService from '../services/monitoring';
import SyncTaskService from '../services/log';
import UserService from '../services/user';

export function* fetchOverview({profile}) {
    try {
        const {isNationalCoordinator} = yield select(({session}) => session.profile);
        const {areas} = yield call(MonitoringService.fetchGeneralMonitoring);
        let logs;
        let users;
        let dwellings;
        let blocks;
        let sides;
        let dwellingsTypes;
        if (isNationalCoordinator) {
            users = yield call(UserService.fetchAll);
            dwellings = yield call(MonitoringService.fetchDwellings);
            blocks = yield call(MonitoringService.fetchBlocks);
            sides = yield call(MonitoringService.fetchSides);
            dwellingsTypes = yield call(MonitoringService.fetchDwellingsTypes);
            logs = yield call(SyncTaskService.fetchAllSyncTask);
        } else {
            logs = yield call(SyncTaskService.fetchSyncTaskByState, profile.state);
            users = (yield call(UserService.fetch, profile.state)).users;
            dwellings = yield call(MonitoringService.fetchDwellings, {state: profile.state});
            blocks = yield call(MonitoringService.fetchBlocks, {state: profile.state});
            sides = yield call(MonitoringService.fetchSides, {state: profile.state});
            dwellingsTypes = yield call(MonitoringService.fetchDwellingsTypes, {state: profile.state});
        }
        const response = map(
            dwellings, dwelling => ({
                ...dwelling,
                ...find(blocks, block => isEqual(block._id, dwelling._id)) || {},
                ...find(sides, side => isEqual(side._id, dwelling._id)) || {},
                ...find(dwellingsTypes, type => isEqual(type._id, dwelling._id)) || {}
            })
        );
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
