import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import { Router, browserHistory } from 'react-router';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './assets/styles/global.css';
import './assets/fontcustom/_fontcustom.scss';

import en from './../config/i18n/en.json';
import routes from './routes/routes';

require('babel-polyfill');

// Why use browserHistory instead hashHistory
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#browserhistory

ReactDOM.render(
  (
    <LocaleProvider locale={enUS} >
      <IntlProvider locale="en" messages={en}>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} routes={routes} />
      </IntlProvider>
    </LocaleProvider>

  ), document.getElementById('root')
);
