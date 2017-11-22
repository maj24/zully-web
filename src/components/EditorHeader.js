import React from 'react';

import userIcon from './../assets/images/user-icon.png';

class EditorHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="editor-header">
        <div className="flex">
          <div className="owner">
            <img src={userIcon} className={'user-image'}/>
          </div>
          <div id="toolbar">
            <select className="ql-header">
              <option value="1"/>
              <option value="2"></option>
              <option selected></option>
            </select>
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <select className="ql-color">
              <option value="red"></option>
              <option value="green"></option>
              <option value="blue"></option>
              <option value="orange"></option>
              <option value="violet"></option>
              <option value="#d0d1d2"></option>
              <option selected></option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default EditorHeader;
