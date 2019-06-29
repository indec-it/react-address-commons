/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

const API = `${ENDPOINT}api/monitoring/`;

class MonitoringService {
    static fetchGeneralMonitoring() {
        return http.get(`${API}general`);
    }

    static fetchUsers() {
        return http.get(`${API}users`);
    }

    static fetchBlocksData() {
        return http.get(`${API}blocksData`);
    }

    static fetchSidesData() {
        return http.get(`${API}sidesData`);
    }

    static fetchDwellingsData() {
        return http.get(`${API}dwellingsData`);
    }

    static fetchDwellingsTypes() {
        return http.get(`${API}dwellingsTypes`);
    }
}

export default MonitoringService;
