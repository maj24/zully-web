import { browserHistory } from 'react-router';
import { ROUTES, STORAGE_KEY_TOKEN, STORAGE_KEY_USER } from './constants';
import Storage from './storage';

require('babel-polyfill');

class Auth {

  login(response) {
    Storage.setJsonObject(STORAGE_KEY_TOKEN, response.token);
    Storage.setJsonObject(STORAGE_KEY_USER, response.user);
  }

  logout() {
    Storage.removeJsobObject(STORAGE_KEY_TOKEN);
    Storage.removeJsobObject(STORAGE_KEY_USER);
    browserHistory.push(ROUTES.LOGIN);
  }

  getToken() {
    return Storage.getJsonObject(STORAGE_KEY_TOKEN);
  }

  getUser() {
    return Storage.getJsonObject(STORAGE_KEY_USER);
  }

  getTeam() {
    let user = this.getUser();
    let team_pk;
    if (user.institutions && user.institutions.length > 0) {
      team_pk = user.institutions[0].pk;
    }
    return team_pk;
  }

  getTeamName() {
    let user = this.getUser();
    let team_name;
    if (user.institutions && user.institutions.length > 0) {
      team_name = user.institutions[0].name;
    }
    return team_name;
  }

  loggedIn() {
    return Storage.getJsonObject(STORAGE_KEY_TOKEN) && !!this.getToken();
  }

}

export default new Auth();
