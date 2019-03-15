/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

const API = `${ENDPOINT}api/dwellings/`;

export default class DwellingService {
    static fetchDwellingsBySide(side) {
        return http.get(`${API}${side}`);
    }
}
