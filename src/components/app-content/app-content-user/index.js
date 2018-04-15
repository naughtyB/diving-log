import React from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppContentUserData from './app-content-userData/index';
import AppContentUserLog from './app-content-log/index';
import AppContentUserStore from './app-content-store/index';
import './index.css'


export class AppContentUser extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedKeys: ['userData']
    };
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
  }
  handleMenuSelect({item, key, selectedKeys}){
    if(selectedKeys[0] === key){
      this.props.history.push({
        pathname: '/user/' + key 
      })
    }
  }
  componentWillMount(){
    this.setState(() => {
      return {
        selectedKeys: [this.props.location.pathname.replace(/\/user\/([\S\s]+)/, '$1')]
      }
    })
  }
  componentWillUpdate(nextProps){
    if(this.props.location.pathname !== nextProps.location.pathname){
      this.setState(() => {
        return {
          selectedKeys: [nextProps.location.pathname.replace(/\/user\/([\S\s]+)/, '$1')]
        }
      })
    }
  }
  render(){
    return (
      <div className="app-content-user">
        <div className="app-content-user-menu">
          <Menu
            style={{ width: 256 }}
            selectedKeys={this.state.selectedKeys}
            mode="inline"
            onSelect={this.handleMenuSelect}
          >
            <Menu.Item key="data" className="app-content-user-menu-each">
              个人信息
            </Menu.Item>
            <Menu.Item key="log" className="app-content-user-menu-each">
              我的日志
            </Menu.Item>
            <Menu.Item key="store" className="app-content-user-menu-each">
              我的收藏
            </Menu.Item>
          </Menu>
        </div>
        <div className="app-content-user-introduce">
          <Switch>
            <Route 
              exact path="/user/data"
              key="user"
              render={({history,location}) => {
                return <AppContentUserData
                  history={history}
                  location={location}
                />
              }}
            />
            <Route 
              exact path="/user/log"
              key="log"
              render={({history,location}) => {
                return <AppContentUserLog
                  history={history}
                  location={location}
                />
              }}
            />
            <Route 
              exact path="/user/store"
              key="log"
              render={({history,location}) => {
                return <AppContentUserStore
                  history={history}
                  location={location}
                />
              }}
            />
            <Redirect 
              to={{
                pathname: '/user/data'
              }}
            />
          </Switch>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContentUser);