import { browserHistory } from 'react-router';
import { ROUTES, STORAGE_KEY_TOKEN, STORAGE_KEY_USER, STORAGE_KEY_TEAM } from './constants';
import Storage from './storage';

require('babel-polyfill');

const dummyResponse = {
  user: {
    username: 'huriata@gmail.com',
    team_pk: '1',
  },
  token: '5bf453e35040c3c9f086d95bf0653d130ecad497',
};

class Auth {

  login(response) {
    Storage.setJsonObject(STORAGE_KEY_TOKEN, dummyResponse.token);
    Storage.setJsonObject(STORAGE_KEY_TEAM, dummyResponse.user.team_pk);
  }

  logout() {
    Storage.removeJsobObject(STORAGE_KEY_TOKEN);
    Storage.removeJsobObject(STORAGE_KEY_USER);
    browserHistory.push(ROUTES.HOME);
  }

  getToken() {
    return Storage.getJsonObject(STORAGE_KEY_TOKEN);
  }

  getUser() {
    return Storage.getJsonObject(STORAGE_KEY_USER);
  }

  loggedIn() {
    return Storage.getJsonObject(STORAGE_KEY_TOKEN) && !!this.getToken();
  }

}

export default new Auth();
