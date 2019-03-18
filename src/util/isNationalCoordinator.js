import {includes} from 'lodash';

import {roles} from '../constants';

const isNationalCoordinator = profile => (
    includes(profile.roles, roles.NATIONAL_COORDINATOR_RO) || includes(profile.roles, roles.NATIONAL_COORDINATOR)
);

export default isNationalCoordinator;
