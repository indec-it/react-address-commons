export const SIDES_BY_BLOCK_FETCH_REQUESTED = 'SIDES_BY_BLOCK_FETCH_REQUESTED';
export const SIDES_BY_BLOCK_FETCH_SUCCEEDED = 'SIDES_BY_BLOCK_FETCH_SUCCEEDED';

export const requestFetchSides = block => ({type: SIDES_BY_BLOCK_FETCH_REQUESTED, block});
export const receiveSides = sides => ({type: SIDES_BY_BLOCK_FETCH_SUCCEEDED, sides});
