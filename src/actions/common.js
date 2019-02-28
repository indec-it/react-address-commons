export const AN_ERROR_OCCURRED = 'AN_ERROR_OCCURRED';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const anErrorOccurred = error => ({type: AN_ERROR_OCCURRED, error});

export const clearError = () => ({type: CLEAR_ERROR});
