import { browserHistory } from 'react-router';
import { ROUTES } from './constants';

require('babel-polyfill');

class Auth {

  login(email, password, cb) {
    localStorage.app_token = 'true';
  }

  logout(cb) {
    delete localStorage.app_token;
    browserHistory.push(ROUTES.HOME);
  }

  getToken() {
    return localStorage.app_token;
  }

  loggedIn() {
    return !!localStorage.app_token;
  }

}

export default new Auth();
