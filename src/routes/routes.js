import Layout from './../style/Layout';
import Home from './Home';
import Login from './Login';
import Main  from './Main';
import GenericNotFound from './GenericNotFound';
import Validation from './../utils/validation.js';
import Collection from './Collection';

export default {
  component: Layout,
  childRoutes: [
    {
      childRoutes: [ Home, Collection ],
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
