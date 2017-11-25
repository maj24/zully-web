import React from 'react';

class Toolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const displayStyle = !this.props.isEditMode ? {display: 'none'} : {};
    return (
      <div id='toolbar'>
        <div style={displayStyle}>
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
      </div>
    );
  }
}

export default Toolbar;
