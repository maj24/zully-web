import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();
export const APP_VERSION = '0.1';
export const API_KEY_BUGSNAG = env.REACT_APP_API_KEY_BUGSNAG;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  MAIN: {
    APP: '/main',
  },
};