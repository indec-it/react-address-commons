import {includes, some} from 'lodash';
import {roles, optionsForUsersSelect} from '../constants';

const getRoles = user => {
    if (some([roles.NATIONAL_COORDINATOR_RO, roles.NATIONAL_COORDINATOR], role => includes(user.roles, role))) {
        return optionsForUsersSelect;
    }
    if (includes(user.roles, roles.COORDINATOR)) {
        return [
            {_id: null, name: '[Todos]'},
            {_id: 'su', name: 'Supervisor'},
            {_id: 'po', name: 'Actualizador'},
            {_id: 'sc', name: 'Subcoordinador Provincial'}
        ];
    }
    if (includes(user.roles, roles.SUB_COORDINATOR)) {
        return [
            {_id: null, name: '[Todos]'},
            {_id: 'su', name: 'Supervisor'},
            {_id: 'po', name: 'Actualizador'}
        ];
    }
    return null;
};

export default getRoles;
