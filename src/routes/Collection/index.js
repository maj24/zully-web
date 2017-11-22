import App from './../../app/App';
import Collection from '../../app/landing/collection/Collection';

module.exports = {
  path: 'collections/:collectionId',
  component: App,
  indexRoute: { component: Collection },
};
