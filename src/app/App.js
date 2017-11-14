import React from 'react';
import CustomSider from '../components/CustomSider';
import { Layout } from 'antd';
const { Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout className="app">
        <CustomSider/>
        <Layout style={{ marginLeft: 240 }}>
          <Content className="app-content">
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
