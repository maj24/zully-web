import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Layout, Menu, Icon, Input, Popover, Button } from 'antd';
const Search = Input.Search;
import {ROUTES} from '../utils/constants';
import auth from '../utils/auth';
import  CollectionService from '../api/CollectionService';
const { Sider } = Layout;
import userIcon from './../assets/images/user-icon.png';
import Storage from '../utils/storage';


class CustomSider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      currentItem: '0',
      inputVisible: false,
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.hideInput = this.hideInput.bind(this);
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
    if (e.key !== 'add') {
      browserHistory.push('/collections/' + e.key);
      this.setState({
        currentItem: e.key,
      });
    } else {
      this.setState({ inputVisible: true }, () => this.input.focus());
    }
  };

  handleLogoutClick = () => {
    auth.logout();
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

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    console.log('handle input confirm');
    const inputValue = this.state.inputValue;
    let teamId = auth.getTeam();
    CollectionService.create(
      { name: inputValue },
      teamId
    ).then(response => {
      console.log('response->', response);
      this.fetchCollections(teamId);
    });
    this.setState({inputVisible: false});
  };

  fetchCollections(teamId) {
    CollectionService.getTeamCollections(teamId).then(response => {
      console.log('collections => ', response);
      this.setState({ collections: response.collections});
    });
  }

  hideInput() {
    this.setState({inputVisible: false});
  }

  saveInputRef = input => this.input = input;

  render() {
    const { inputVisible } = this.state;
    return (
      <div>
        <Sider className="sider" style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
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
            {!inputVisible &&
              <Menu.Item key={'add'}>
                <Icon type="plus" />
                <span className="nav-text add-collection">Agregar Colección</span>
              </Menu.Item>
            }
          </Menu>
          {inputVisible &&
            <div className="input-add">
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                onChange={this.handleInputChange}
                onPressEnter={this.handleInputConfirm}
                placeholder={'Nombre'}
                onBlur={this.hideInput}
              />
            </div>
          }
          <div className="flex user">
            <Popover
              placement="topLeft"
              title=""
              content={
                <a className="logout-text" onClick={this.handleLogoutClick}>Cerrar Sesión</a>
              }
              trigger="click"
            >
              <div className="creator-container">
                <img src={userIcon} className="user-image"/>
                <span>{!!Storage.getJsonObject('zully_user') &&
                `${Storage.getJsonObject('zully_user').firstName} ${Storage.getJsonObject('zully_user').lastName}`
                }
                </span>
              </div>
            </Popover>
          </div>
        </Sider>
      </div>
    );
  }
}

export default CustomSider;
