import React from 'react';
import { Menu, Button } from 'antd';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie'; 
import { doChangeUserLoginState } from '../../redux/action/user'
import './index.css';

export class AppHeader extends React.Component{
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.handleLogOff =this.handleLogOff.bind(this)
    this.state = {
      selectedKeys: []
    }
  }
  handleLogOff(){
    this.props.onChangeUserLoginState(false);
    Cookies.remove('username');
    Cookies.remove('userId')
    if(/^\/user/.test(this.props.location.pathname) || /^\/releaseLog/.test(this.props.location.pathname)){
      this.props.history.push({
        pathname: '/logWorld'
      })
    }
  }
  handleLogin(){
    this.props.history.push({
      pathname: '/login'
    })
  }
  componentDidMount(){
    fetch('/server/autoLogin', {
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    }).then(res => {
      return res.json()
    }).then(res => {
      if(!res.err){
        this.props.onChangeUserLoginState(true);
        Cookies.set('username', res.userData['username']);
        Cookies.set('userId',res.userData['userId']);
      }
    })
    this.setState(() => {
      const pathname = this.props.location.pathname;
      return {
        selectedKeys: [pathname]
      }
    })
  }
  componentDidUpdate(preProps){
    console.log(this.props.location.pathname)
    const pathname = this.props.location.pathname;
    if(pathname !== preProps.location.pathname && /^\/\S+$/g.test(pathname)){
      this.setState(() => {
        return {
          selectedKeys: [pathname]
        }
      })
    }
  }
  handleMenuSelect({item, key, selectedKeys}){
    this.setState(() => {
      return {
        selectedKeys: [key]
      }
    })
    this.props.history.push({
      pathname: key,
      hash: key='/releaseLog' ? 'type=add' : ''
    })
  }
  render(){
    return (
      <div style={{display: 'flex'}}>
        <div className="logo" style={{width: '206px'}}>
          <a style={{display: 'inline-block', height: '80px', lineHeight: '80px'}}>
            <img 
              src="http://localhost:8000/public/image/homepage/diving.png" 
              alt="logo"
              style={{width: '30px', verticalAlign: 'middle'}}
            />
            <span style={{marginLeft: '10px', fontSize: '20px', verticalAlign: 'middle'}}>LET'S DIVING</span>
          </a>
        </div>
        <div style={{flex: '1 1', display: 'flex', padding: '0 50px'}}>
          <Menu
            mode="horizontal"
            style={{height: '80px'}}
            onSelect={this.handleMenuSelect}
            selectedKeys={this.state.selectedKeys}
          >
            <Menu.Item key="/logWorld" style={{height: '80px', lineHeight: '80px'}}>
              潜水日志世界
            </Menu.Item>
            <Menu.Item key="/releaseLog" style={{height: '80px', lineHeight: '80px'}}>
              发布潜水日志
            </Menu.Item>
          </Menu>
        </div>
        {
          this.props.loginState ? (
            [
              <div key="user" style={{height: '80px', lineHeight: '80px', marginRight: '5px'}}>
                <Button type="primary" style={{height: '30px'}} onClick={() => this.props.history.push({pathname: '/user'})}>个人中心</Button>
              </div>, 
              <div key="logOff" style={{height: '80px', lineHeight: '80px'}}>
                <Button style={{height: '30px'}} onClick={this.handleLogOff}>注销</Button>
              </div>
            ]
          ) : (
            <div style={{height: '80px', lineHeight: '80px'}}>
              <Button type="primary" style={{height: '30px'}} onClick={this.handleLogin}>登录</Button>
            </div>
          )
        }      
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loginState: state.user.loginState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeUserLoginState: (loginState) => dispatch(doChangeUserLoginState(loginState))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppHeader));