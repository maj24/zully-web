import React from 'react';
import Footer from './Footer.js';
import {Link} from 'react-router';

class GenericNotFound extends React.Component {
  render() {
    return (
    	<div>
    		<div className='blue-gradient'>
    			<div className='container'>
            <div className='row'>
            	<div className='col-md-6 left vcenter'>
            		<h1>Oh no, it’s a <span>404.</span></h1>
            		<p>Apparently you’re lost and need to go home.</p>
            		<Link className='btn btn-red' to='/' > Go Home</Link>
            	</div>
              <div className='col-md-6 vcenter'>
              </div>
            </div>
          </div>
    	</div>
    	<Footer />
    	</div>
  	);
  }
};

export default GenericNotFound;

