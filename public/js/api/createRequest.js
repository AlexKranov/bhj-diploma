/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    const request = new XMLHttpRequest();
    request.responseType = options.responseType;
    request.withCredentials = true;

    if (options.method === 'GET') {
        let url = options.url;
        if (options.data) {
            url += '?';
            let data = options.data;
            for (let key in data) {
                url += key + '=' + data[key] + '&';
            }
            url = url.slice(0, -1);
        }

    } else {
        let formData = new FormData();
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }

    request.addEventListener('readystatechange', () => {

        if (request.readyState === request.DONE && request.status === 200) {
            let err = null;
            let response = request.response;
            options.callback(err, response);
        }
    });
    return request;
};