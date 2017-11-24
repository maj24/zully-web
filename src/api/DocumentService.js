import Api from './Api';

const API_ENDPOINT_DOCUMENTS = 'documents';

module.exports = {

  create(data) {
    return Api.post(`${API_ENDPOINT_DOCUMENTS}/create/`, data, {});
  },

  getCollectionDocuments(collectionId) {
    return Api.get(`${API_ENDPOINT_DOCUMENTS}/list/${collectionId}/`, {}, {});
  },

  getDocument(documentId) {
    return Api.get(`document/${documentId}/`, {}, {});
  },

};