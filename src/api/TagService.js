import Api from './Api';

const API_ENDPOINT_TAGS = 'tags';

module.exports = {

  create(data, teamId) {
    return Api.post(`${API_ENDPOINT_TAGS}/create/${teamId}/`, data, {});
  },

  getCollectionTags(collectionId) {
    return Api.get(`collection/${API_ENDPOINT_TAGS}/list/${collectionId}/`, {}, {});
  },

};
