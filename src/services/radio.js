/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

import {buildQueryString} from '../util';

const API = `${ENDPOINT}api/radios/`;

export default class RadioService {
    static fetchRadios(params) {
        return http.get(`${API}${buildQueryString(params)}`);
    }
}
