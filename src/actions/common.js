export const ERROR_OCCURRED = 'ERROR_OCCURRED';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const handleError = err => ({
    type: ERROR_OCCURRED,
    err
});

export const clearError = () => ({
    type: CLEAR_ERROR
});

export const VERSION_FETCH_REQUESTED = 'VERSION_FETCH_REQUESTED';
export const VERSION_FETCH_SUCCEEDED = 'VERSION_FETCH_SUCCEEDED';

export const requestFetchVersion = () => ({
    type: VERSION_FETCH_REQUESTED
});

export const receiveVersion = (version, date) => ({
    type: VERSION_FETCH_SUCCEEDED,
    version,
    date
});
