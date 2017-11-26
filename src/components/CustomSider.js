import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Layout, Menu, Icon, Input } from 'antd';
const Search = Input.Search;
import {ROUTES} from '../utils/constants';
import auth from '../utils/auth';
import  CollectionService from '../api/CollectionService';
const { Sider } = Layout;

class CustomSider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      currentItem: '0',
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    let teamId = auth.getTeam();
    CollectionService.getTeamCollections(teamId).then(response => {
      console.log('collections => ', response);
      this.setState({ collections: response.collections});
    });

    let pathname = this.props.pathname;
    pathname = pathname.split('/');
    console.log('array', pathname);
    if (pathname !== null && pathname.length >= 3) {
      if (pathname[1] === 'collections') {
        this.setState({
          currentItem: pathname[2],
        });
      }
    }

    // browserHistory.listen((event)=>{
    //   let pathname = event.pathname.split('/');
    //   if (pathname != null && pathname.length >= 3) {
    //     if (pathname[1] === 'collections') {
    //       this.setState({
    //         currentItem: pathname[2],
    //       });
    //     }
    //   }
    // });
  }

  handleMenuClick = (e) => {
    console.log('click ', e);
    browserHistory.push('/collections/' + e.key);
    this.setState({
      currentItem: e.key,
    });
  };

  displaySiderItems() {
    let collections = this.state.collections;
    return collections.map((collection, i) => {
      return <Menu.Item key={collection.pk}>
        <Link to={`${ROUTES.COLLECTIONS}/${collection.pk}`}>{ collection.name }</Link>
      </Menu.Item>;
    });
  }

  handleSearch = (value) => {
    console.log('handle search', value);
    browserHistory.push(`${ROUTES.COLLECTIONS}?query=${value}`);
  };

  render() {
    return (
      <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <div className="logo" />
        <div className="search">
          <Search
            placeholder="¿Qué problema tienes?"
            style={{ width: 200 }}
            onSearch={this.handleSearch}
          />
        </div>
        <div className="team">
          Yellowme
        </div>
        <Menu
          mode="inline"
          selectedKeys={[ this.state.currentItem ]}
          onClick={this.handleMenuClick}
        >
          { this.displaySiderItems() }
          <Menu.Item key="7">
            <Icon type="plus" />
            <span className="nav-text">Agregar Colección</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default CustomSider;
