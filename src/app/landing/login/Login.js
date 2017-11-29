import React from 'react';
import { Button, Row, Col, Input } from 'antd';
import auth from './../../../utils/auth.js';
import CollectionService from '../../../api/LoginService';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: '',
        password: '',
      },
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
    CollectionService.authenticate(this.state.credentials).then(response => {
      console.log('Logged in');
      console.log(response);
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={11} style={{padding: '50px'}}>
            <img src="https://cdn.zeplin.io/5a065a600eb3d8c1717fe3a3/assets/AA2F8B82-3887-4D31-9570-43A439E2FE0B.png"
            height="80" style={{marginBottom: '20px'}}/>
            <br/>
            <p style={{fontSize: '250%',fontWeight: 'bold'}}>Donde tu trabajo fluye</p>
            <br/>
            <p style={{marginBottom: '40px'}}>
              Zully centraliza el registro de todas las problemáticas y soluciones que se han presentado en tu empresa.
              Optimiza tu proceso de trabajo evitando redescubrir la rueda, tus compañeros pueden ya haber documentado
              esa hazaña.
            </p>
            <Input placeholder="nombre@ejemplo.com" size="large" onChange={this.handleUsernameChange} />
            <p style={{margin: '20px'}}/>
            <Input placeholder="contraseña" size="large" type="password" onChange={this.handlePasswordChange} />
            <p style={{margin: '40px'}}/>
            <Button onClick={this.handleLoginClick} size="large" type="primary" style={{width: '100%',marginBottom: '10px'}}>
              Iniciar Sesión
            </Button>
            <center><p>¿No tienes cuenta? <a><b>Regístrate</b></a></p></center>
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

      </div>
    );
  }
}
;

export default Login;
