import React from 'react';
import { Link } from 'react-router';
import { Icon, Tag } from 'antd';
import userIcon from './../assets/images/user-icon.png';

const card = {
  title: 'Arquitectura MVP',
  text: 'Lorem ipsum lorem ipsum lorem lor ipsumlorem ipsumlorem ipsum asd ipsumlorem ipsumlorem asd asd asd ipsumipsumlorem ipsumlorem asd ipsumipsumlorem ipsumlorem ips',
};

const collectionId = 1;
const issueId = 2;

class ProblemCard extends React.Component {

  render() {
    return (
      <div className='col-md-4'>
        <div className="problem-card">
          <div className={'card-header'}>
            <div><p>{card.title}</p></div>
            <div className={'icons pull-right'}>
              <Link to={`/collections/${collectionId}/issues/${issueId}`}>
                <Icon type="eye" style={{ fontSize: 18, color: '#82858d', margin: '5px' }}/>
              </Link>
              <Icon type="eye" style={{ fontSize: 18, color: '#82858d', margin: '5px' }}/>
              <Icon type="edit" style={{ fontSize: 18, color: '#82858d', margin: '5px' }}/>
            </div>
          </div>
          <div className={'card-body'}>
            <p>{card.text}</p>
          </div>
          <div className="card-footer">
            <img src={userIcon} className={'user-image'}/>
            <div className={'tags-container'}>
              <Tag color="#0f8ee9">Tag1</Tag>
              <Tag color="#0f8ee9">Tag2</Tag>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProblemCard;
