/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

export default class ManualsService {
    static getManuals() {
        return http.get(`${ENDPOINT}api/manuals`);
    }
}
