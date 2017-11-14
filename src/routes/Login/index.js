import App from './../../app/App';
import Login from './../../app/landing/login/Login';

module.exports = {
  path: '/login',
  component: App,
  indexRoute: { component: Login },
};