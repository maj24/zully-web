import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.scss';
import './buttons.scss';
import './labels.css';
import './shared.scss';
import './antd-custom.scss';
import 'react-quill/dist/quill.snow.css';
import './components.scss';

class Layout extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className='wrapper'>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
};

export default Layout;
