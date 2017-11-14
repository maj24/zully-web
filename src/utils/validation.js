import auth from './auth.js';
import { ROUTES } from './constants';

module.exports = {

  redirectToDashboard(nextState, replace) {
    if (auth.loggedIn()) {
      replace(ROUTES.MAIN.APP);
    }
  },

  redirectToLogin(nextState, replace) {
    if (!auth.loggedIn()) {
      replace(ROUTES.LOGIN);
    }
  },

};