export const FETCH_SYNC_LOG_REQUESTED = 'FETCH_SYNC_LOG_REQUESTED';
export const FETCH_SYNC_LOG_SUCCEEDED = 'FETCH_SYNC_LOG_SUCCEEDED';

export const requestFetchSyncTask = (state, rol, term, skip) => ({
    type: FETCH_SYNC_LOG_REQUESTED,
    state,
    rol,
    term,
    skip
});

export const receiveSyncTask = (logs, logsCount, pageSize) => ({
    type: FETCH_SYNC_LOG_SUCCEEDED,
    logs,
    logsCount,
    pageSize
});
