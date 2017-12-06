import React from 'react';
import auth from '../../../utils/auth';
import  CollectionService from '../../../api/CollectionService';
import { browserHistory } from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    let teamId = auth.getTeam();
    CollectionService.getTeamCollections(teamId).then(response => {
      if (response.collections.length > 0) {
        browserHistory.push('/collections/' + response.collections[0].pk);
      }
    });
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}


export default Home;
