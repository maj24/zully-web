import React from 'react';
import { Button, Row, Col, Input, Alert } from 'antd';
import auth from './../../../utils/auth.js';
import { browserHistory } from 'react-router';
import CollectionService from '../../../api/LoginService';
import { ROUTES, STORAGE_KEY_TOKEN, STORAGE_KEY_USER, STORAGE_KEY_TEAM } from '../../../utils/constants';
import Storage from '../../../utils/storage';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      credentialsError: false,
      loggingIn: false,
    };
  }

  doLogin() {
    auth.login('email', 'password', null);
  }

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleLoginClick = () => {
    this.setState({ loggingIn: true });
    let credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log(credentials);
    CollectionService.authenticate(credentials).then(res => {
      console.log(res);
      Storage.setJsonObject(STORAGE_KEY_TOKEN, res.token);
      Storage.setJsonObject(STORAGE_KEY_USER, res.user);
      browserHistory.push(ROUTES.HOME);
    }).catch(e=>{
      this.setState({ credentialsError: true, loggingIn: false });
    });
  };

  render() {
    return (
      <Row className="login">
        <Col span={11} className="login-content">
          <img src="https://cdn.zeplin.io/5a065a600eb3d8c1717fe3a3/assets/AA2F8B82-3887-4D31-9570-43A439E2FE0B.png"
               height="80" style={{marginBottom: '20px'}}/>
          <br/>
          <p style={{fontSize: '250%', fontWeight: 'bold'}}>Donde tu trabajo fluye</p>
          <br/>
          <p style={this.state.credentialsError && {marginBottom: '10px'} || {marginBottom: '40px'}}>
            <b>Zully</b> centraliza el registro de todas las problemáticas y soluciones que se han presentado en tu
            empresa.
            <b> Optimiza</b> tu proceso de trabajo evitando redescubrir la rueda, tus compañeros pueden ya haber
            documentado
            esa hazaña.
          </p>

          {this.state.credentialsError && [ <Alert message="Usuario o contraseña incorrectos" type="error" />,<br/> ]}

          <Input
            placeholder="nombre@ejemplo.com"
            // className={this.state.credentialsError && 'login-input login-error' || 'login-input' }
            className='login-input'
            size="large"
            onChange={this.handleUsernameChange}
          />
          <p style={{margin: '10px'}}/>
          <Input
            placeholder="contraseña"
            // className={this.state.credentialsError && 'login-input login-error' || 'login-input' }
            className='login-input'
            size="large"
            type="password"
            onChange={this.handlePasswordChange}
            onPressEnter={this.handleLoginClick}
          />
          <p style={{margin: '30px'}}/>
          <Button onClick={this.handleLoginClick} size="large" type="primary" className="login-btn" loading={this.state.loggingIn}>
            Iniciar Sesión
          </Button>
          <center><p>¿No tienes cuenta? <a className="register-link"><b>Regístrate</b></a></p></center>
        </Col>

        <Col span={13} style={{backgroundColor: '#c2185b'}} className="hidden-xs">
          <Row type="flex" justify="space-around" align="middle" style={{height: '100vh', padding: '75px'}}>
            <img
              src="https://cdn.zeplin.io/5a065a600eb3d8c1717fe3a3/assets/C2D49A72-2DE3-4339-92F8-A415E6792041.png"
              style={{width: '100%'}}
            />
          </Row>
        </Col>
      </Row>
    );
  }
}
;

export default Login;
