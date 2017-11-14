/* eslint-disable no-undef */
import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();
const REACT_APP_API_ENDPOINT = env.REACT_APP_API_ENDPOINT;
function search(endpoint, query, limit, page, sort, dir, cb) {
  return fetch(`${REACT_APP_API_ENDPOINT}/${endpoint}?filter=${query}&limit=${limit}&page=${page}&sort=${sort}&dir=${dir}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function get(endpoint, {id}, params, cb) {
  let endpointID = id ? `/${id}` : '';
  let url = `${REACT_APP_API_ENDPOINT}/${endpoint}${endpointID}?`;
  for (let prop in params) {
    if (params.hasOwnProperty(prop)) {
      url = `${url}${prop}=${params[prop]}&`;
    }
  }
  return fetch(url, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function post(endpoint, data ,cb) {
  return fetch(`${REACT_APP_API_ENDPOINT}/${endpoint}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'POST',
    body: JSON.stringify(data),
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function put(endpoint, data ,cb) {
  return fetch(`${REACT_APP_API_ENDPOINT}/${endpoint}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
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
