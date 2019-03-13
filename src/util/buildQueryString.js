import {mapValues} from 'lodash';

const buildQueryString = searchParams => {
    const params = new URLSearchParams();
    mapValues(searchParams, (value, key) => params.set(key, value));
    return `?${params.toString()}`;
};

export default buildQueryString;
