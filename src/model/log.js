export default class Log {
    _id = Date.now();
    user = {
        username: '',
        name: '',
        surname: '',
        iat: null
    };

    constructor(obj) {
        Object.assign(this, obj);
    }
}
