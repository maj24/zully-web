import Login from './../../app/landing/login/Login';
import NakedApp from '../../app/NakedApp';

module.exports = {
  path: '/login',
  component: NakedApp,
  indexRoute: { component: Login },
};
