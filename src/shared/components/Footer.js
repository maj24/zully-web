import React from 'react';
import {Link} from 'react-router';

class Footer extends React.Component {
  render() {
    const { position } = this.props;
    return (
      <footer className={`footer ${position}`}>
      	<div className="pull-left">
          <div className="footer-content">
            <ul>
              <li>© Brandon Logan</li>
              <li><Link to='/terms' >Terms and Conditions</Link></li>
              <li><Link to='/cookies' >Cookies</Link></li>
              <li><Link to='/privacy' >Privacy Policy</Link></li>
              <li className="pull-right"><Link to='/help' >Help</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}


Footer.defaultProps = {
  position: 'relative',
};

export default Footer;
