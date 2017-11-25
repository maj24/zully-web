import React from 'react';
import { Link } from 'react-router';
import { Icon, Tag } from 'antd';
import userIcon from './../assets/images/user-icon.png';


class ProblemCard extends React.Component {
  constructor(props) {
    super(props);
    this.displayTags = this.displayTags.bind(this);
  }

  displayTags() {
    let {document} = this.props;
    return document.tags.map((tag, i) => {
      return <Tag color="#0f8ee9">{tag.name}</Tag>;
    });
  }

  render() {
    const {document, collectionId} = this.props;
    return (
      <div className='col-md-4'>
        <div className="problem-card">
          <div className={'card-header'}>
            <div><p>{document.name}</p></div>
            <div className={'icons pull-right'}>
              <Link to={`/collections/${collectionId}/issues/${document.pk}?mode=1`}>
                <Icon type="eye" style={{ fontSize: 18, color: '#82858d', margin: '5px' }}/>
              </Link>
              <Link to={`/collections/${collectionId}/issues/${document.pk}?mode=2`}>
                <Icon type="edit" style={{ fontSize: 18, color: '#82858d', margin: '5px' }}/>
              </Link>
            </div>
          </div>
          <div className={'card-body'}>
            <p>{document.content}</p>
          </div>
          <div className="card-footer">
            <img src={userIcon} className={'user-image'}/>
            <div className={'tags-container'}>
              {this.displayTags()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProblemCard;
