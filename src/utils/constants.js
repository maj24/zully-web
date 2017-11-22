import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();
export const APP_VERSION = '0.1';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  COLLECTIONS: '/collections',
  MAIN: {
    APP: '/main',
  },
};
