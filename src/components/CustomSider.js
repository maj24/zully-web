import React from 'react';
import { Link } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
import {ROUTES} from '../utils/constants';
const { Sider } = Layout;

const siderItems = [
  { text: 'Administración', path: '' },
  { text: 'Desarrollo Móvil', path: '' },
  { text: 'Desarrollo Web', path: '' },
  { text: 'Diseño UI/UX', path: '' },
  { text: 'Finanzas', path: '' },
  { text: 'Soporte a Clientes', path: '' },
  { text: 'Documentación', path: '' },
];

class CustomSider extends React.Component {

  displaySiderItems() {
    return siderItems.map((siderItem, i) => {
      return <Menu.Item key={i}>
        <Link to={`${ROUTES.COLLECTIONS}/${i}`}>{ siderItem.text }</Link>
      </Menu.Item>;
    });
  }

  render() {
    return (
      <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <div className="logo" />
        <div className="workspace">
          Yellowme
        </div>
        <Menu mode="inline" defaultSelectedKeys={[ '0' ]}>
          { this.displaySiderItems() }
          <Menu.Item key="7">
            <Icon type="plus" />
            <span className="nav-text">Agregar Colección</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default CustomSider;
