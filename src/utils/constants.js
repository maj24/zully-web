import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();
export const APP_VERSION = '0.1';
export const STORAGE_KEY_TOKEN = 'zully_token';
export const STORAGE_KEY_USER = 'zully_user';
export const STORAGE_KEY_TEAM = 'zully-team';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  COLLECTIONS: '/collections',
  MAIN: {
    APP: '/main',
  },
};
