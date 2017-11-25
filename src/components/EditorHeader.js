import React from 'react';

import userIcon from './../assets/images/user-icon.png';
import {Button, Icon} from 'antd';
import Toolbar from './Toolbar';

class EditorHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {isEditMode} = this.props;
    return (
      <div className="editor-header">
        <div className="flex match-width">
          <div className="owner flex">
            <img src={userIcon} className={'user-image'}/>
            <div className="creator-container">
              <p className="creator-label">Creado por:</p>
              <p className="creator">Majo Patron</p>
            </div>
          </div>
          <Toolbar isEditMode={isEditMode}/>
          <div className="actions pull-right">
            { isEditMode ?
              <Button className="save-btn" type="primary">Guardar</Button> :
              <Button className="save-btn" type="primary" ghost>Editar</Button>
            }
            <Icon className="close-icon" type="close" />
          </div>
        </div>
      </div>
    );
  }
}

export default EditorHeader;
