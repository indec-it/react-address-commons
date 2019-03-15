/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

const API = `${ENDPOINT}api/blocks/`;

export default class SideService {
    static exportBlock(block) {
        return http.get(`${API}${block}`);
    }
}
