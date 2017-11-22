import React from 'react';

import userIcon from './../assets/images/user-icon.png';
import {Button, Icon} from 'antd';

class EditorHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
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
          <div id='toolbar'>
            <select className="ql-header">
              <option value="1"/>
              <option value="2"></option>
              <option selected></option>
            </select>
            <select className="ql-align">
              <option value="center"></option>
              <option value="right"></option>
              <option value="justify"></option>
              <option selected></option>
            </select>
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
            <button className="ql-strike"></button>
            <select className="ql-color">
              <option value="red"></option>
              <option value="green"></option>
              <option value="blue"></option>
              <option value="orange"></option>
              <option value="violet"></option>
              <option value="#d0d1d2"></option>
              <option selected></option>
            </select>
            <button className="ql-link"></button>
            <button className="ql-image"></button>
            <button className="ql-video"></button>

            <button className="ql-blockquote"></button>
            <button className="ql-code-block"></button>
          </div>
          <div className="actions pull-right">
            <Button className="save-btn" type="primary">Guardar</Button>
            <Icon className="close-icon" type="close" />
          </div>
        </div>
      </div>
    );
  }
}

export default EditorHeader;
