/* global ENDPOINT */
import {http} from '@indec/heimdall/client';
import {identity, keys, pickBy} from 'lodash';

const API = `${ENDPOINT}api/monitoring/`;

const buildQueryString = filters => keys(
    pickBy(filters, identity)
).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`
).join('&');

class MonitoringService {
    static fetchGeneralMonitoring() {
        return http.get(`${API}general`);
    }

    static fetchDwellings(filters) {
        return http.get(`${API}dwellings?${buildQueryString(filters)}`);
    }

    static fetchBlocks(filters) {
        return http.get(`${API}blocks?${buildQueryString(filters)}`);
    }

    static fetchSides(filters) {
        return http.get(`${API}sides?${buildQueryString(filters)}`);
    }

    static fetchDwellingsTypes(filters) {
        return http.get(`${API}dwellingTypes?${buildQueryString(filters)}`);
    }
}

export default MonitoringService;
