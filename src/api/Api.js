/* eslint-disable no-undef */
import auth from '../utils/auth.js';
import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();
const REACT_APP_API_ENDPOINT = env.REACT_APP_API_ENDPOINT;
const proxyurl = 'https://cors-anywhere.herokuapp.com/';

function createHeaders() {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (auth.loggedIn()) {
    headers.append('Authorization', 'Token ' + auth.getToken());
  }
  return headers;
}

function search(endpoint, query, limit, page, sort, dir, cb) {
  let url = `${REACT_APP_API_ENDPOINT}/${endpoint}?filter=${query}&limit=${limit}&page=${page}&sort=${sort}&dir=${dir}`;
  return fetch(proxyurl + url, {
    headers: createHeaders(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function get(endpoint, {id}, params) {
  let endpointID = id ? `/${id}` : '';
  let url = `${REACT_APP_API_ENDPOINT}/${endpoint}${endpointID}`;
  for (let prop in params) {
    if (params.hasOwnProperty(prop)) {
      url = `${url}${prop}=${params[prop]}&`;
    }
  }
  return fetch(proxyurl + url, {
    headers: createHeaders(),
  }).then(checkStatus)
    .then(parseJSON);
}

function post(endpoint, data) {
  let url = `${REACT_APP_API_ENDPOINT}/${endpoint}`;
  return fetch(proxyurl + url, {
    headers: createHeaders(),
    method: 'POST',
    body: JSON.stringify(data),
  }).then(checkStatus)
    .then(parseJSON);
}

function put(endpoint, data ,cb) {
  let url = `${REACT_APP_API_ENDPOINT}/${endpoint}`;
  return fetch(proxyurl + url, {
    headers: createHeaders(),
    method: 'PUT',
    body: JSON.stringify(data),
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 400) {
    return response;
  }
  return Promise.reject(response);
}

function parseJSON(response) {
  if (response.status === 204) {
    return response;
  }
  return response.json();
}

const Api = { search, post, get, put };
export default Api;
