export const OVERVIEW_FETCH_REQUESTED = 'OVERVIEW_FETCH_REQUESTED';
export const OVERVIEW_FETCH_SUCCEEDED = 'OVERVIEW_FETCH_SUCCEEDED';
export const OVERVIEW_CLEAN_REDUCER = 'OVERVIEW_CLEAN_REDUCER';

export const fetchOverview = profile => ({type: OVERVIEW_FETCH_REQUESTED, profile});

export const receiveOverview = (areas, availableStates, isNationalCoordinator) => ({
    type: OVERVIEW_FETCH_SUCCEEDED, areas, availableStates, isNationalCoordinator
});

export const cleanOverviewReducer = () => ({
    type: OVERVIEW_CLEAN_REDUCER
});

export const SET_MAP_STATE = 'SET_MAP_STATE';

export const setMapState = state => ({
    type: SET_MAP_STATE,
    state
});

export const CLEAN_MAP_SELECTION = 'CLEAN_MAP_SELECTION';

export const cleanMapSelection = () => ({
    type: CLEAN_MAP_SELECTION
});

export const LOGS_BY_STATE_FETCH_REQUESTED = 'LOGS_BY_STATE_FETCH_REQUESTED';
export const LOGS_BY_STATE_FETCH_SUCCEEDED = 'LOGS_BY_STATE_FETCH_SUCCEEDED';

export const requestFetchLogsByState = state => ({type: LOGS_BY_STATE_FETCH_REQUESTED, state});
export const receiveLogsByState = logs => ({type: LOGS_BY_STATE_FETCH_SUCCEEDED, logs});

export const BLOCKS_FOR_DASHBOARD_FETCH_REQUESTED = 'BLOCKS_FOR_DASHBOARD_FETCH_REQUESTED';
export const BLOCKS_FOR_DASHBOARD_FETCH_SUCCEEDED = 'BLOCKS_FOR_DASHBOARD_FETCH_SUCCEEDED';

export const requestFetchBlocksForDashboard = () => ({type: BLOCKS_FOR_DASHBOARD_FETCH_REQUESTED});
export const receiveBlocksForDashboard = blocks => ({type: BLOCKS_FOR_DASHBOARD_FETCH_SUCCEEDED, blocks});

export const SIDES_FOR_DASHBOARD_FETCH_REQUESTED = 'SIDES_FOR_DASHBOARD_FETCH_REQUESTED';
export const SIDES_FOR_DASHBOARD_FETCH_SUCCEEDED = 'SIDES_FOR_DASHBOARD_FETCH_SUCCEEDED';

export const requestFetchSidesForDashboard = () => ({type: SIDES_FOR_DASHBOARD_FETCH_REQUESTED});
export const receiveSidesForDashboard = sides => ({type: SIDES_FOR_DASHBOARD_FETCH_SUCCEEDED, sides});

export const DWELLINGS_FOR_DASHBOARD_FETCH_REQUESTED = 'DWELLINGS_FOR_DASHBOARD_FETCH_REQUESTED';
export const DWELLINGS_FOR_DASHBOARD_FETCH_SUCCEEDED = 'DWELLINGS_FOR_DASHBOARD_FETCH_SUCCEEDED';

export const requestFetchBlockForDashboard = () => ({type: DWELLINGS_FOR_DASHBOARD_FETCH_REQUESTED});
export const receiveDwellingsForDashboard = dwellings => ({type: DWELLINGS_FOR_DASHBOARD_FETCH_SUCCEEDED, dwellings});

export const DWELLINGS_TYPES_FOR_DASHBOARD_FETCH_REQUESTED = 'DWELLINGS_TYPES_FOR_DASHBOARD_FETCH_REQUESTED';
export const DWELLINGS_TYPES_FOR_DASHBOARD_FETCH_SUCCEEDED = 'DWELLINGS_TYPES_FOR_DASHBOARD_FETCH_SUCCEEDED';

export const requestFetchDwellingsTypesForDashboard = () => ({type: DWELLINGS_TYPES_FOR_DASHBOARD_FETCH_REQUESTED});
export const receiveDwellingsTypesForDashboard = dwellingsTypes => ({
    type: DWELLINGS_TYPES_FOR_DASHBOARD_FETCH_SUCCEEDED, dwellingsTypes
});

export const USERS_FOR_OVERVIEW_FETCH_REQUESTED = 'USERS_FOR_OVERVIEW_FETCH_REQUESTED';
export const USERS_FOR_OVERVIEW_FETCH_SUCCEEDED = 'USERS_FOR_OVERVIEW_FETCH_SUCCEEDED';

export const requestFetchUsersForOverview = () => ({type: USERS_FOR_OVERVIEW_FETCH_REQUESTED});
export const receiveUsersForOverview = users => ({type: USERS_FOR_OVERVIEW_FETCH_SUCCEEDED, users});

export const LOGS_FOR_OVERVIEW_FETCH_REQUESTED = 'LOGS_FOR_OVERVIEW_FETCH_REQUESTED';
export const LOGS_FOR_OVERVIEW_FETCH_SUCCEEDED = 'LOGS_FOR_OVERVIEW_FETCH_SUCCEEDED';

export const requestFetchLogsForOverview = () => ({type: LOGS_FOR_OVERVIEW_FETCH_REQUESTED});
export const receiveLogsForOverview = logs => ({type: LOGS_FOR_OVERVIEW_FETCH_SUCCEEDED, logs});
