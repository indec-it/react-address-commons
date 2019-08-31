/* eslint-disable prefer-destructuring */
import {
    call, put, select, fork
} from 'redux-saga/effects';

import {handleError, receiveOverview} from '../actions';
import {
    receiveLogsByState,
    receiveBlocksForDashboard,
    receiveSidesForDashboard,
    receiveDwellingsForDashboard,
    receiveDwellingsTypesForDashboard,
    receiveLogsForOverview,
    receiveUsersForOverview
} from '../actions/overview';
import MonitoringService from '../services/monitoring';
import SyncTaskService from '../services/log';
import UserService from '../services/user';

export function* fetchBlocksForOverview() {
    try {
        const {isNationalCoordinator, state} = yield select(({session}) => session.profile);
        const blocks = yield call(MonitoringService.fetchBlocks, isNationalCoordinator ? {} : {state});
        yield put(receiveBlocksForDashboard(blocks));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchSidesForOverview() {
    try {
        const {isNationalCoordinator, state} = yield select(({session}) => session.profile);
        const sides = yield call(MonitoringService.fetchSides, isNationalCoordinator ? {} : {state});
        yield put(receiveSidesForDashboard(sides));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchDwellingsForOverview() {
    try {
        const {isNationalCoordinator, state} = yield select(({session}) => session.profile);
        const dwellings = yield call(MonitoringService.fetchDwellings, isNationalCoordinator ? {} : {state});
        yield put(receiveDwellingsForDashboard(dwellings));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchDwellingsTypesForOverview() {
    try {
        const {isNationalCoordinator, state} = yield select(({session}) => session.profile);
        const dwellingsTypes = yield call(
            MonitoringService.fetchDwellingsTypes, isNationalCoordinator ? {} : {state}
        );
        yield put(receiveDwellingsTypesForDashboard(dwellingsTypes));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchLogsForOverview() {
    try {
        const {isNationalCoordinator, state} = yield select(({session}) => session.profile);
        const logs = isNationalCoordinator ? yield call(SyncTaskService.fetchAllSyncTask) : yield call(
            SyncTaskService.fetchSyncTaskByState, state
        );
        yield put(receiveLogsForOverview(logs));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchUsersForOverview() {
    try {
        const {isNationalCoordinator, state} = yield select(({session}) => session.profile);
        const {users} = isNationalCoordinator ? yield call(UserService.fetchAll) : yield call(UserService.fetch, state);
        yield put(receiveUsersForOverview(users));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchOverview() {
    try {
        const {isNationalCoordinator} = yield select(({session}) => session.profile);
        const {areas} = yield call(MonitoringService.fetchGeneralMonitoring);
        yield fork(fetchBlocksForOverview);
        yield fork(fetchSidesForOverview);
        yield fork(fetchDwellingsForOverview);
        yield fork(fetchDwellingsTypesForOverview);
        yield fork(fetchLogsForOverview);
        yield fork(fetchUsersForOverview);
        yield put(receiveOverview(areas, areas.map(area => area._id.state), isNationalCoordinator));
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
