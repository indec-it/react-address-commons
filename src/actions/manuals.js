export const MANUALS_FETCH_REQUESTED = 'MANUALS_FETCH_REQUESTED';
export const MANUALS_FETCH_SUCCEEDED = 'MANUALS_FETCH_SUCCEEDED';

export const requestFetchManuals = () => ({
    type: MANUALS_FETCH_REQUESTED
});

export const receiveManuals = manuals => ({
    type: MANUALS_FETCH_SUCCEEDED,
    manuals
});
