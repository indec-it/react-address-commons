import {AN_ERROR_OCCURRED} from '../actions';

const defaultState = {anErrorOccurred: false, errorMsg: null};

export default function session(state = defaultState, action) {
    switch (action.type) {
        case AN_ERROR_OCCURRED:
            /* eslint no-console: 0 */
            console.log(`%c !!! ${action.error.errorMsg} !!!`, 'color: #df0101; font-size: 15px;');
            return {...state, anErrorOccurred: action.error.anErrorOccurred, errorMsg: action.error.errorMsg};
        default:
            return state;
    }
}
