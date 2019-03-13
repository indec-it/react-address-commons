/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

import {buildQueryString} from '../util';

const API = `${ENDPOINT}api/spreadsheet/`;

export default class SpreadsheetsService {
    static fetchBlockSpreadsheets(params) {
        return http.get(`${API}blocks/${buildQueryString(params)}`);
    }

    static fetchDwellingSpreadsheets(params) {
        return http.get(`${API}dwellings/${buildQueryString(params)}`);
    }
}
