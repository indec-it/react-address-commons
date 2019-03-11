/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

export default class VersionService {
    static getVersion() {
        return http.get(`${ENDPOINT}version`);
    }
}
