import {includes} from 'lodash';
import {roles} from '../constants';

const getRoleName = user => {
    if (includes(user.roles, roles.NATIONAL_COORDINATOR)) {
        return 'Coordinador Nacional';
    }
    if (includes(user.roles, roles.NATIONAL_COORDINATOR_RO)) {
        return 'Coordinador Nacional (SL)';
    }
    if (includes(user.roles, roles.COORDINATOR)) {
        return 'Coordinador Provincial';
    }
    if (includes(user.roles, roles.SUB_COORDINATOR)) {
        return 'Subcoordinador Provincial';
    }
    if (includes(user.roles, roles.SUPERVISOR)) {
        return 'Supervisor';
    }
    return 'Actualizadores';
};

export default getRoleName;
