export const ERROR_OCCURRED = 'ERROR_OCCURRED';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const handleError = err => ({type: ERROR_OCCURRED, err});

export const clearError = () => ({type: CLEAR_ERROR});
