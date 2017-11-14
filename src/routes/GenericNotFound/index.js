import GenericNotFound from './../../shared/components/GenericNotFound';

module.exports = {
  path: '/*',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, GenericNotFound);
    });
  },
};