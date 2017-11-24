import Api from './Api';

const API_ENDPOINT_TAGS = 'tags';

module.exports = {

  create(data, teamId) {
    return Api.post(`${API_ENDPOINT_TAGS}/create/${teamId}/`, data, {});
  },

  getCollectionTags(teamId) {
    return Api.get(`${API_ENDPOINT_TAGS}/list/${teamId}/`, {}, {});
  },

};
