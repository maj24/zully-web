import React from 'react';
import {Link} from 'react-router';
import { ROUTES } from './../../../utils/constants';

class Home extends React.Component {
  render() {
    return (
      <div>
      	HOME
      	<ul>
      		<li><Link to={ROUTES.LOGIN} > Login </Link></li>
      		<li><Link to={ROUTES.MAIN.APP} > APP </Link></li>
      	</ul>
      </div>
    );
  }
}


export default Home;
