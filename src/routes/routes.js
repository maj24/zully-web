import Layout from './../style/Layout';
import Home from './Home';
import Login from './Login';
import Main  from './Main';
import GenericNotFound from './GenericNotFound';
import Validation from './../utils/validation.js';

export default {
  component: Layout,
  childRoutes: [
    {
      childRoutes: [ Home ],
    },
    {
      onEnter: Validation.redirectToDashboard,
      childRoutes: [ Login ],
    },
    {
      onEnter: Validation.redirectToLogin,
      childRoutes: [ Main ],
    },
    GenericNotFound,
  ],
};
