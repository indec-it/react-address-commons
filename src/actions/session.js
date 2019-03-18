export const SESSION_REQUESTED = 'SESSION_REQUESTED';
export const SESSION_RECEIVED = 'SESSION_RECEIVED';

export const requestSession = () => ({
    type: SESSION_REQUESTED
});

export const receiveSession = profile => ({
    type: SESSION_RECEIVED, profile
});
