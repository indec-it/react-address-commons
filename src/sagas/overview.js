import {call, put, select} from 'redux-saga/effects';

import MonitoringService from '../services/monitoring';
import {handleError, receiveOverview} from '../actions';

// eslint-disable-next-line
export function* fetchOverview({state}) {
    try {
        const {isNationalCoordinator} = yield select(({session}) => session.profile);
        const {areas} = yield call(MonitoringService.fetchGeneralMonitoring, state);
        const dwellingsTypes = yield call(MonitoringService.fetchDwellingsTypes);
        const logs = yield call(MonitoringService.fetchSync);
        const {users} = yield call(MonitoringService.fetchUsers, state);
        const {blocks} = yield call(MonitoringService.fetchBlocksData, state);
        const {sides} = yield call(MonitoringService.fetchSidesData, state);
        const {dwellings} = yield call(MonitoringService.fetchDwellingsData, state);
        const response = {
            blocks, sides, dwellings, dwellingsTypes
        };
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
