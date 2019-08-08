import {find, isEqual, map} from 'lodash';

const getMonitoring = (dwellings, blocks, sides, dwellingsTypes) => map(
    dwellings, dwelling => ({
        ...dwelling,
        ...find(blocks, block => isEqual(block._id, dwelling._id)) || {},
        ...find(sides, side => isEqual(side._id, dwelling._id)) || {},
        ...find(dwellingsTypes, type => isEqual(type._id, dwelling._id)) || {}
    })
);

export default getMonitoring;
