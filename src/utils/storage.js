module.exports = {

  setJsonObject(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
  },

  getJsonObject(key) {
    return JSON.parse(localStorage.getItem(key));
  },

  removeJsobObject(key) {
    localStorage.removeItem(key);
  },
};