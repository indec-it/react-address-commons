export const RADIOS_FETCH_REQUESTED = 'RADIOS_FETCH_REQUESTED';
export const RADIOS_FETCH_SUCCEEDED = 'RADIOS_FETCH_SUCCEEDED';

export const requestFetchRadios = params => ({type: RADIOS_FETCH_REQUESTED, params});
export const receiveRadios = radios => ({type: RADIOS_FETCH_SUCCEEDED, radios});
