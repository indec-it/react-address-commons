/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

const API = `${ENDPOINT}api/sides/`;

export default class SideService {
    static fetchSidesByBlock(block) {
        return http.get(`${API}${block}`);
    }
}
