import Layout from './../style/Layout';
import Home from './Home';
import Login from './Login';
import Main  from './Main';
import GenericNotFound from './GenericNotFound';
import Validation from './../utils/validation.js';
import Collection from './Collection';
import Issue from './Issue';

export default {
  component: Layout,
  childRoutes: [
    {
      childRoutes: [ Home, Collection, Issue ],
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
