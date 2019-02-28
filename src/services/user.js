/* global ENDPOINT */
import {http} from '@indec/heimdall/client';
import {map} from 'lodash';

import {User} from '../model';

const API = `${ENDPOINT}api/users/`;

export default class UserService {
    static async fetch(state, rol, term, skip) {
        const searchParams = new URLSearchParams();
        if (state) {
            searchParams.set('state', state);
        }
        if (rol) {
            searchParams.set('rol', rol);
        }
        if (term) {
            searchParams.set('term', term);
        }
        if (skip) {
            searchParams.set('skip', skip);
        }
        const {
            users, usersCount, pageSize, states
        } = await http.get(`${API}?${searchParams.toString()}`);
        return {
            users: map(users, user => new User(user)),
            usersCount,
            pageSize,
            states
        };
    }

    static async findById(id) {
        const user = await http.get(`${API}findById?id=${id}`);
        return new User(user);
    }
}
