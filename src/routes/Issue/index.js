import App from './../../app/App';
import Issue from '../../app/landing/issue/Issue';

module.exports = {
  path: 'collections/:collectionId/issues(/:issueId)',
  component: App,
  indexRoute: { component: Issue },
};
