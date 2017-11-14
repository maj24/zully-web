import React from 'react';
import { Button } from 'antd';
import auth from './../../../utils/auth.js';

class Login extends React.Component {

  doLogin() {
    auth.login('email','password', null);
  }

  render() {
    return (
      <div>
      	<Button onClick={this.doLogin.bind(this)} >Do Login</Button>
      </div>
    );
  }
}
;

export default Login;
