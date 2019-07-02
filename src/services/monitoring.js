/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

const API = `${ENDPOINT}api/monitoring/`;

class MonitoringService {
    static fetchGeneralMonitoring(state) {
        const searchParams = new URLSearchParams();
        if (state) {
            searchParams.set('state', state);
        }
        return http.get(`${API}general?${searchParams.toString()}`);
    }

    static fetchUsers(state) {
        const searchParams = new URLSearchParams();
        if (state) {
            searchParams.set('state', state);
        }
        return http.get(`${API}users?${searchParams.toString()}`);
    }

    static fetchBlocksData(state) {
        const searchParams = new URLSearchParams();
        if (state) {
            searchParams.set('state', state);
        }
        return http.get(`${API}blocksData?${searchParams.toString()}`);
    }

    static fetchSidesData(state) {
        const searchParams = new URLSearchParams();
        if (state) {
            searchParams.set('state', state);
        }
        return http.get(`${API}sidesData?${searchParams.toString()}`);
    }

    static fetchDwellingsData(state) {
        const searchParams = new URLSearchParams();
        if (state) {
            searchParams.set('state', state);
        }
        return http.get(`${API}dwellingsData?${searchParams.toString()}`);
    }

    static fetchDwellingsTypes() {
        return http.get(`${API}dwellingsTypes`);
    }

    static fetchSync() {
        return http.get(`${API}logs`);
    }
}

export default MonitoringService;
