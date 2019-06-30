export const OVERVIEW_FETCH_REQUESTED = 'OVERVIEW_FETCH_REQUESTED';
export const OVERVIEW_FETCH_SUCCEEDED = 'OVERVIEW_FETCH_SUCCEEDED';
export const OVERVIEW_CLEAN_REDUCER = 'OVERVIEW_CLEAN_REDUCER';

export const fetchOverview = state => ({type: OVERVIEW_FETCH_REQUESTED, state});

export const receiveOverview = (areas, response, logs, users, availableStates, isNationalCoordinator) => ({
    type: OVERVIEW_FETCH_SUCCEEDED, areas, response, logs, users, availableStates, isNationalCoordinator
});

export const cleanOverviewReducer = () => ({type: OVERVIEW_CLEAN_REDUCER});

export const SET_MAP_STATE = 'SET_MAP_STATE';

export const setMapState = state => ({type: SET_MAP_STATE, state});

export const CLEAN_MAP_SELECTION = 'CLEAN_MAP_SELECTION';

export const cleanMapSelection = () => ({type: CLEAN_MAP_SELECTION});
