export const DWELLING_SPREADSHEETS_FETCH_REQUESTED = 'DWELLING_SPREADSHEETS_FETCH_REQUESTED';
export const DWELLING_SPREADSHEETS_FETCH_SUCCEEDED = 'DWELLING_SPREADSHEETS_FETCH_SUCCEEDED';

export const requestDwellingSpreadsheets = params => ({type: DWELLING_SPREADSHEETS_FETCH_REQUESTED, params});
export const receiveDwellingsSpreadsheets = dwellings => ({type: DWELLING_SPREADSHEETS_FETCH_SUCCEEDED, dwellings});

export const BLOCK_SPREADSHEETS_FETCH_REQUESTED = 'BLOCK_SPREADSHEETS_FETCH_REQUESTED';
export const BLOCK_SPREADSHEETS_FETCH_SUCCEEDED = 'BLOCK_SPREADSHEETS_FETCH_SUCCEEDED';

export const requestBlockSpreadsheets = params => ({type: BLOCK_SPREADSHEETS_FETCH_REQUESTED, params});
export const receiveBlockSpreadsheets = blocks => ({type: BLOCK_SPREADSHEETS_FETCH_SUCCEEDED, blocks});
