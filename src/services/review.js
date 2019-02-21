/* global ENDPOINT */
import {http} from '@indec/heimdall/client';

const API = `${ENDPOINT}api/review/`;

export default class ReviewService {
    static getStates() {
        return http.get(`${API}states`);
    }
}
