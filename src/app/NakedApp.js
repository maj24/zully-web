import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

class NakedApp extends React.Component {
  render() {
    return (
      <Content>
        {this.props.children}
      </Content>
    );
  }
};

export default NakedApp;
