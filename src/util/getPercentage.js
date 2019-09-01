import {round} from 'lodash';

const getPercentage = (value, total, precision = 0) => {
    const percentage = round((value * 100) / total, precision);
    return !percentage ? 0 : percentage;
};

export default getPercentage;
