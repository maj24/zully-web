import Api from './Api';

const API_ENDPOINT_CLIENTS = 'clients';

module.exports = {

  create(client, cb) {
    return Api.post(API_ENDPOINT_CLIENTS, client, cb);
  },

};
