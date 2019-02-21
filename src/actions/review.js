export const STATES_FETCH_REQUESTED = 'STATES_FETCH_REQUESTED';
export const STATES_FETCH_SUCCEEDED = 'STATES_FETCH_SUCCEEDED';

export const requestFetchStates = () => ({type: STATES_FETCH_REQUESTED});
export const receiveStates = states => ({type: STATES_FETCH_SUCCEEDED, states});
