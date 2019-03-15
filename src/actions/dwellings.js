export const DWELLINGS_BY_SIDE_FETCH_REQUESTED = 'DWELLINGS_BY_SIDE_FETCH_REQUESTED';
export const DWELLINGS_BY_SIDE_FETCH_SUCCEEDED = 'DWELLINGS_BY_SIDE_FETCH_SUCCEEDED';

export const requestFetchDwellings = side => ({type: DWELLINGS_BY_SIDE_FETCH_REQUESTED, side});
export const receiveDwellings = (dwellings, street) => ({type: DWELLINGS_BY_SIDE_FETCH_SUCCEEDED, dwellings, street});
