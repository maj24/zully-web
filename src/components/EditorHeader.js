import React from 'react';

import userIcon from './../assets/images/user-icon.png';
import {Button, Icon} from 'antd';
import Toolbar from './Toolbar';
import { browserHistory } from 'react-router';
import {ROUTES} from '../utils/constants';

class EditorHeader extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleClickEdit() {
    const {collectionId, issueId} = this.props;
    browserHistory.push(`${ROUTES.COLLECTIONS}/${collectionId}${ROUTES.DOCUMENTS}/${issueId}?mode=2`);
  }

  handleClickSave() {
    this.props.saveDocument();
  }

  handleExit() {
    browserHistory.push(`${ROUTES.COLLECTIONS}/${this.props.collectionId}/`);
  }

  render() {
    const {isEditMode, creator} = this.props;
    return (
      <div className="editor-header">
        <div className="flex match-width">
          { creator !== undefined && <div className="owner flex">
            <img src={userIcon} className={'user-image'}/>
            <div className="creator-container">
              <p className="creator-label">Creado por:</p>
              <p className="creator">{creator.name}</p>
            </div>
          </div> }
          <Toolbar isEditMode={isEditMode}/>
          <div className="actions pull-right">
            { isEditMode ?
              <Button loading={this.props.loading} className="save-btn" type="primary" onClick={this.handleClickSave}>Guardar</Button> :
              <Button className="save-btn" type="primary" ghost onClick={this.handleClickEdit}>Editar</Button>
            }
            <Icon className="close-icon" type="close" onClick={this.handleExit} />
          </div>
        </div>
      </div>
    );
  }
}

export default EditorHeader;
