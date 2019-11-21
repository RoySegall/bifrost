import axios from 'axios';

function request(params = {}) {

    const token = window.localStorage.getItem('token');
    const instance = axios.create();

    instance.interceptors.request.use(function (config) {

        if (params['graphql'] != undefined) {
            config['method'] = 'post';
            config['url'] = 'graphql/';

            if (config['data'] == undefined) {
                config['data'] = {};
            }

            config['data']['query'] = params['graphql'];
        }

        config['url'] = `${process.env.REACT_APP_BACKEND}/${config['url']}`;
        config['headers'] = {
            'Content-Type': 'application/json',
        };

        if (token) {
            config['headers']['Authorization'] = `Token ${token}`;
        }

        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    return instance;
}

export default request;
