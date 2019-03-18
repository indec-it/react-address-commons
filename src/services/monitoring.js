/* global ENDPOINT */
import {http} from '@indec/heimdall/client';
import {identity, keys, pickBy} from 'lodash';

const API = `${ENDPOINT}api/monitoring/`;

class MonitoringService {
    static fetchGeneralMonitoring() {
        return http.get(`${API}general`);
    }

    static fetchResponseMonitoring(filters) {
        const query = keys(
            pickBy(filters, identity)
        ).map(
            key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`
        ).join('&');
        return http.get(`${API}response?${query}`);
    }
}

export default MonitoringService;
