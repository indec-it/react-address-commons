/* global ENDPOINT */
import {http} from '@indec/heimdall/client';
import {isEmpty} from 'lodash';

const API = `${ENDPOINT}api/sync/logs/`;

class SyncTaskService {
    static fetchSyncTask(state, rol, term, skip) {
        const searchParams = new URLSearchParams();
        if (state) {
            searchParams.set('state', state);
        }
        if (rol) {
            searchParams.set('rol', rol);
        }
        if (!isEmpty(term)) {
            searchParams.set('term', term);
        }
        if (skip) {
            searchParams.set('skip', skip);
        }
        return http.get(`${API}?${searchParams.toString()}`);
    }
}

export default SyncTaskService;
