import {head} from 'lodash';

const getRadioData = blocks => {
    const firstBlock = head(blocks);
    if (!firstBlock) {
        return null;
    }
    const {
        state, department, agglomerate, locality, radio, fraction, ups, area
    } = firstBlock;
    return {
        state, department, agglomerate, locality, radio, fraction, ups, area
    };
};

export default getRadioData;
