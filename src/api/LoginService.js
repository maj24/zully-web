import Api from './Api';

const API_ENDPOINT_ACCOUNT = 'account';

module.exports = {

  authenticate(data) {
    return Api.post('authenticate/', data, {});
  },

  create(data) {
    return Api.post(`${API_ENDPOINT_ACCOUNT}/create/`, data, {});
  },

};
