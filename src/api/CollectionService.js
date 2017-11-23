import Api from './Api';

const API_ENDPOINT_COLLECTIONS = 'collections';

module.exports = {

  create(data, teamId) {
    return Api.post(`${API_ENDPOINT_COLLECTIONS}/create/${teamId}/`, data, {});
  },

  getTeamCollections(teamId) {
    return Api.get(`${API_ENDPOINT_COLLECTIONS}/list/${teamId}/`, {}, {});
  },

};
